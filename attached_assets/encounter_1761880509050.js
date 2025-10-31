// Pathfinder 2e Encounter Builder - Core Encounter Logic

/**
 * Calculate the target XP for an encounter based on party size and threat level
 * @param {number} partySize - Number of party members
 * @param {string} threatLevel - Threat level key (trivial, low, moderate, severe, extreme)
 * @returns {number} Target XP value
 */
function calculateTargetXP(partySize, threatLevel) {
    const threat = THREATS[threatLevel];
    if (!threat) return 0;
    
    const baseXP = threat.xp;
    let adjustedXP = baseXP;
    
    // Adjust for party size if not standard 4 members
    if (partySize !== 4) {
        const sizeAdjustment = threat.adjustment * (partySize - 4);
        adjustedXP = baseXP + sizeAdjustment;
    }
    
    return Math.max(adjustedXP, 10);
}

/**
 * Calculate total XP from monster composition
 * @param {Object} composition - Object with monster role counts
 * @returns {number} Total XP value
 */
function calculateTotalXP(composition) {
    let totalXP = 0;
    for (const [role, count] of Object.entries(composition)) {
        if (ROLES[role] && typeof count === 'number') {
            totalXP += ROLES[role].xp * count;
        }
    }
    return totalXP;
}

/**
 * Assess threat level based on current vs target XP
 * @param {number} currentXP - Current encounter XP
 * @param {number} targetXP - Target XP for the threat level
 * @returns {Object} Object with status string and CSS class
 */
function getThreatAssessment(currentXP, targetXP) {
    if (targetXP === 0) {
        return { status: 'No Target', class: 'threat-trivial' };
    }
    
    const ratio = currentXP / targetXP;
    
    if (ratio < 0.6) {
        return { status: 'Too Easy', class: 'threat-trivial' };
    } else if (ratio < 0.8) {
        return { status: 'Below Target', class: 'threat-low' };
    } else if (ratio <= 1.2) {
        return { status: 'Balanced', class: 'threat-moderate' };
    } else if (ratio <= 1.5) {
        return { status: 'Above Target', class: 'threat-severe' };
    } else {
        return { status: 'Too Hard', class: 'threat-extreme' };
    }
}

/**
 * Get the effective level of a monster based on its role and party level
 * @param {string} role - Monster role key
 * @param {number} partyLevel - Base party level
 * @returns {number} Effective monster level (clamped between -1 and 20)
 */
function getMonsterLevel(role, partyLevel) {
    const roleData = ROLES[role];
    if (!roleData) return partyLevel;
    
    const baseLevelMod = roleData.levelMod;
    return Math.max(-1, Math.min(20, partyLevel + baseLevelMod));
}

/**
 * Get monster statistics for a specific role and party level
 * @param {string} role - Monster role key
 * @param {number} partyLevel - Base party level
 * @param {Object} statsChart - Statistics chart to use (STATS_STANDARDS or STATS_PUBLISHED)
 * @returns {Object} Monster statistics with level included
 */
function getMonsterStats(role, partyLevel, statsChart) {
    const level = getMonsterLevel(role, partyLevel);
    const stats = statsChart[level.toString()];
    
    if (!stats) {
        // Fallback to level 1 stats if level not found
        const fallbackStats = statsChart["1"] || {};
        return { ...fallbackStats, level };
    }
    
    return { ...stats, level };
}

/**
 * Validate encounter composition
 * @param {Object} composition - Monster composition object
 * @returns {Object} Validation result with isValid boolean and errors array
 */
function validateEncounter(composition) {
    const errors = [];
    let totalMonsters = 0;
    
    // Count total monsters and check for valid values
    for (const [role, count] of Object.entries(composition)) {
        if (!ROLES[role]) {
            errors.push(`Invalid role: ${role}`);
            continue;
        }
        
        if (typeof count !== 'number' || count < 0) {
            errors.push(`Invalid count for ${role}: ${count}`);
            continue;
        }
        
        totalMonsters += count;
    }
    
    // Check for reasonable limits
    if (totalMonsters === 0) {
        errors.push('Encounter must contain at least one monster');
    }
    
    if (totalMonsters > 20) {
        errors.push('Encounter contains too many monsters (limit: 20)');
    }
    
    // Check for multiple apex bosses (generally not recommended)
    if (composition.apexBoss > 1) {
        errors.push('Multiple Apex Bosses may be overly complex');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        totalMonsters: totalMonsters
    };
}

/**
 * Generate encounter suggestions based on target XP
 * @param {number} targetXP - Target XP for the encounter
 * @param {string} threatLevel - Current threat level
 * @returns {Array} Array of suggested encounter compositions
 */
function generateEncounterSuggestions(targetXP, threatLevel) {
    const suggestions = [];
    
    // Filter templates that match the current threat level
    const relevantTemplates = Object.entries(TEMPLATES)
        .filter(([key, template]) => template.threat.includes(threatLevel))
        .map(([key, template]) => ({ key, ...template }));
    
    // Add templates that are close to target XP
    for (const template of relevantTemplates) {
        const xpDifference = Math.abs(template.xp - targetXP);
        const xpRatio = template.xp / targetXP;
        
        if (xpRatio >= 0.8 && xpRatio <= 1.2) { // Within 20% of target
            suggestions.push({
                ...template,
                xpDifference,
                match: 'exact'
            });
        }
    }
    
    // Sort by XP difference (closest matches first)
    suggestions.sort((a, b) => a.xpDifference - b.xpDifference);
    
    return suggestions.slice(0, 5); // Return top 5 suggestions
}

/**
 * Create a complete encounter object
 * @param {number} partySize - Number of party members
 * @param {number} partyLevel - Party level
 * @param {string} threatLevel - Threat level
 * @param {Object} composition - Monster composition
 * @returns {Object} Complete encounter data
 */
function createEncounter(partySize, partyLevel, threatLevel, composition) {
    const targetXP = calculateTargetXP(partySize, threatLevel);
    const totalXP = calculateTotalXP(composition);
    const validation = validateEncounter(composition);
    
    return {
        partySize,
        partyLevel,
        threatLevel,
        composition: { ...composition },
        targetXP,
        totalXP,
        validation,
        assessment: getThreatAssessment(totalXP, targetXP),
        suggestions: generateEncounterSuggestions(targetXP, threatLevel)
    };
}
