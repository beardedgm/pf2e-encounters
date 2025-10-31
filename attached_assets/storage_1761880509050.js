// Pathfinder 2e Encounter Builder - Local Storage Management

/**
 * Save an encounter to local storage
 * @param {Object} encounter - The encounter data to save
 */
function saveEncounter(encounter) {
    try {
        const saved = getSavedEncounters();
        const newEncounter = {
            ...encounter,
            id: Date.now(),
            timestamp: new Date().toLocaleString()
        };
        
        saved.unshift(newEncounter);
        localStorage.setItem('pf2e_savedEncounters', JSON.stringify(saved.slice(0, 20))); // Keep only 20 most recent
        return true;
    } catch (error) {
        console.error('Failed to save encounter:', error);
        return false;
    }
}

/**
 * Get all saved encounters from local storage
 * @returns {Array} Array of saved encounters
 */
function getSavedEncounters() {
    try {
        const saved = localStorage.getItem('pf2e_savedEncounters');
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Failed to load saved encounters:', error);
        return [];
    }
}

/**
 * Load a specific encounter by ID
 * @param {number} id - The encounter ID to load
 * @returns {Object|null} The encounter data or null if not found
 */
function loadEncounter(id) {
    try {
        const saved = getSavedEncounters();
        return saved.find(encounter => encounter.id === id) || null;
    } catch (error) {
        console.error('Failed to load encounter:', error);
        return null;
    }
}

/**
 * Delete a specific encounter by ID
 * @param {number} id - The encounter ID to delete
 * @returns {boolean} Success status
 */
function deleteEncounter(id) {
    try {
        const saved = getSavedEncounters();
        const filtered = saved.filter(encounter => encounter.id !== id);
        localStorage.setItem('pf2e_savedEncounters', JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Failed to delete encounter:', error);
        return false;
    }
}

/**
 * Clear all saved encounters
 * @returns {boolean} Success status
 */
function clearAllEncounters() {
    try {
        localStorage.removeItem('pf2e_savedEncounters');
        return true;
    } catch (error) {
        console.error('Failed to clear encounters:', error);
        return false;
    }
}

/**
 * Export encounter data as JSON string
 * @param {Object} encounter - The encounter to export
 * @returns {string} JSON representation of the encounter
 */
function exportEncounterJSON(encounter) {
    try {
        return JSON.stringify(encounter, null, 2);
    } catch (error) {
        console.error('Failed to export encounter as JSON:', error);
        return '';
    }
}

/**
 * Export encounter data as formatted text with compact statistics
 * @param {Object} encounter - The encounter to export
 * @param {Object} statsChart - The statistics chart to use
 * @returns {string} Formatted text representation of the encounter
 */
function exportEncounterText(encounter, statsChart = STATS_STANDARDS) {
    try {
        const threatAssessment = getThreatAssessment(encounter.totalXP, encounter.targetXP);
        const efficiency = Math.round((encounter.totalXP / encounter.targetXP) * 100);
        
        let text = `=== ${THREATS[encounter.threatLevel].name} Encounter for Level ${encounter.partyLevel} Party ===\n`;
        text += `XP Budget: ${encounter.totalXP} / ${encounter.targetXP} XP (${efficiency}% efficiency)\n`;
        text += `Party Size: ${encounter.partySize} characters\n\n`;

        // Generate monster sections with compact stats
        const monstersWithStats = Object.entries(encounter.composition || {})
            .filter(([role, count]) => count > 0)
            .map(([role, count]) => {
                const roleData = ROLES[role];
                const stats = getMonsterStats(role, encounter.partyLevel, statsChart);
                
                return {
                    role,
                    count,
                    roleData,
                    stats
                };
            });

        if (monstersWithStats.length === 0) {
            text += 'No monsters in this encounter.\n';
        } else {
            monstersWithStats.forEach(({ role, count, roleData, stats }) => {
                // Generate entries for each individual monster
                for (let i = 1; i <= count; i++) {
                    text += `${roleData.name} ${i} (Level ${stats.level})\n`;
                    text += `HP: ${stats.hp} | AC: ${stats.ac} | XP: ${roleData.xp}\n`;
                    text += `Fort: +${stats.fortitude} | Ref: +${stats.reflex} | Will: +${stats.will}\n`;
                    text += `Perception: +${stats.perception} | Attack: +${stats.attackBonus} | Spell DC: ${stats.spellDC}\n`;
                    text += `Damage — Low ${stats.lowDamage} | Mod ${stats.moderateDamage} | Sev ${stats.severeDamage} | Ext ${stats.extremeDamage}\n\n`;
                }
            });
        }
        
        return text;
    } catch (error) {
        console.error('Failed to export encounter as text:', error);
        return 'Export failed';
    }
}
