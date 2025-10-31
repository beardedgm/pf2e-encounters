// Pathfinder 2e Encounter Builder - Main Application Logic

// ======= Application State =======
let appState = {
    partySize: 4,
    partyLevel: 1,
    selectedThreat: 'moderate',
    currentStatsChart: STATS_STANDARDS,
    composition: { minion: 0, lieutenant: 0, boss: 0, eliteBoss: 0, apexBoss: 0 }
};

// ======= DOM Elements =======
let elements = {};

// ======= Initialization =======
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeEventListeners();
    loadInitialState();
    updateAllDisplays();
});

/**
 * Initialize DOM element references
 */
function initializeElements() {
    elements = {
        // Party configuration
        partySizeInput: document.getElementById('partySize'),
        partySizeDecrease: document.getElementById('partySizeDecrease'),
        partySizeIncrease: document.getElementById('partySizeIncrease'),
        partyLevelInput: document.getElementById('partyLevel'),
        partyLevelDecrease: document.getElementById('partyLevelDecrease'),
        partyLevelIncrease: document.getElementById('partyLevelIncrease'),
        threatLevelSelect: document.getElementById('threatLevel'),
        
        // Stats chart buttons
        statsStandardsBtn: document.getElementById('statsStandards'),
        statsPublishedBtn: document.getElementById('statsPublished'),
        
        // Monster composition
        roleInputs: document.querySelectorAll('.role-input'),
        
        // XP and status displays
        totalXPSpan: document.getElementById('totalXP'),
        targetXPSpan: document.getElementById('targetXP'),
        threatStatusDiv: document.getElementById('threatStatus'),
        
        // Action buttons
        clearCompositionBtn: document.getElementById('clearComposition'),
        saveEncounterBtn: document.getElementById('saveEncounter'),
        
        // Templates and displays
        templateList: document.getElementById('templateList'),
        monsterStats: document.getElementById('monsterStats'),
        savedEncounters: document.getElementById('savedEncounters'),
        
        // Export functionality
        clearSavedBtn: document.getElementById('clearSaved'),
        exportTextBtn: document.getElementById('exportText'),
        exportJSONBtn: document.getElementById('exportJSON'),
        exportStatsImageBtn: document.getElementById('exportStatsImage'),
        exportOutput: document.getElementById('exportOutput')
    };
}

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Party configuration events
    elements.partySizeInput.addEventListener('input', handlePartySizeInputChange);
    elements.partySizeDecrease.addEventListener('click', () => handlePartySizeChange(-1));
    elements.partySizeIncrease.addEventListener('click', () => handlePartySizeChange(1));
    elements.partyLevelInput.addEventListener('input', handlePartyLevelInputChange);
    elements.partyLevelDecrease.addEventListener('click', () => handlePartyLevelChange(-1));
    elements.partyLevelIncrease.addEventListener('click', () => handlePartyLevelChange(1));
    elements.threatLevelSelect.addEventListener('change', handleThreatLevelChange);
    
    // Stats chart selection
    elements.statsStandardsBtn.addEventListener('click', () => handleStatsChartChange(true));
    elements.statsPublishedBtn.addEventListener('click', () => handleStatsChartChange(false));
    
    // Monster composition controls
    document.querySelectorAll('.role-decrease').forEach(btn => {
        btn.addEventListener('click', handleRoleDecrease);
    });
    document.querySelectorAll('.role-increase').forEach(btn => {
        btn.addEventListener('click', handleRoleIncrease);
    });
    document.querySelectorAll('.role-input').forEach(input => {
        input.addEventListener('input', handleRoleInputChange);
    });
    
    // Action buttons
    elements.clearCompositionBtn.addEventListener('click', handleClearComposition);
    elements.saveEncounterBtn.addEventListener('click', handleSaveEncounter);
    elements.clearSavedBtn.addEventListener('click', handleClearAllSaved);
    
    // Export buttons
    elements.exportTextBtn.addEventListener('click', handleExportText);
    elements.exportJSONBtn.addEventListener('click', handleExportJSON);
    elements.exportStatsImageBtn.addEventListener('click', handleExportStatsImage);
}

/**
 * Load initial application state
 */
function loadInitialState() {
    // Set initial input values
    elements.partySizeInput.value = appState.partySize;
    elements.partyLevelInput.value = appState.partyLevel;
    elements.threatLevelSelect.value = appState.selectedThreat;
    
    // Initialize role inputs
    elements.roleInputs.forEach(input => {
        const role = input.dataset.role;
        input.value = appState.composition[role] || 0;
    });
}

// ======= Event Handlers =======

/**
 * Handle party size +/- button changes
 */
function handlePartySizeChange(delta) {
    const newValue = Math.max(1, Math.min(8, appState.partySize + delta));
    appState.partySize = newValue;
    elements.partySizeInput.value = newValue;
    updateTargetXPDisplay();
    updateThreatAssessmentDisplay();
}

/**
 * Handle party size input field changes
 */
function handlePartySizeInputChange(event) {
    const value = Math.max(1, Math.min(8, parseInt(event.target.value) || 1));
    event.target.value = value;
    appState.partySize = value;
    updateTargetXPDisplay();
    updateThreatAssessmentDisplay();
}

/**
 * Handle party level +/- button changes
 */
function handlePartyLevelChange(delta) {
    const newValue = Math.max(-1, Math.min(20, appState.partyLevel + delta));
    appState.partyLevel = newValue;
    elements.partyLevelInput.value = newValue;
    updateAllDisplays();
}

/**
 * Handle party level input field changes
 */
function handlePartyLevelInputChange(event) {
    const value = Math.max(-1, Math.min(20, parseInt(event.target.value) || 1));
    event.target.value = value;
    appState.partyLevel = value;
    updateAllDisplays();
}

/**
 * Handle threat level selection change
 */
function handleThreatLevelChange(event) {
    appState.selectedThreat = event.target.value;
    updateTargetXPDisplay();
    updateThreatAssessmentDisplay();
    updateTemplatesDisplay();
}

/**
 * Handle stats chart selection
 * @param {boolean} useStandards - Whether to use standards chart
 */
function handleStatsChartChange(useStandards) {
    appState.currentStatsChart = useStandards ? STATS_STANDARDS : STATS_PUBLISHED;
    updateStatsChartButtons(useStandards);
    updateMonsterStatsDisplay();
}

/**
 * Handle role decrease button clicks
 */
function handleRoleDecrease(event) {
    const role = event.target.dataset.role;
    const input = document.querySelector(`.role-input[data-role="${role}"]`);
    const currentValue = parseInt(input.value) || 0;
    const minValue = parseInt(input.min) || 0;
    
    if (currentValue > minValue) {
        const newValue = currentValue - 1;
        input.value = newValue;
        appState.composition[role] = newValue;
        updateAllRoleDisplays();
    }
}

/**
 * Handle role increase button clicks
 */
function handleRoleIncrease(event) {
    const role = event.target.dataset.role;
    const input = document.querySelector(`.role-input[data-role="${role}"]`);
    const currentValue = parseInt(input.value) || 0;
    const maxValue = parseInt(input.max) || 20;
    
    if (currentValue < maxValue) {
        const newValue = currentValue + 1;
        input.value = newValue;
        appState.composition[role] = newValue;
        updateAllRoleDisplays();
    }
}

/**
 * Handle role input field changes
 */
function handleRoleInputChange(event) {
    const role = event.target.dataset.role;
    const value = Math.max(0, Math.min(parseInt(event.target.value) || 0, parseInt(event.target.max)));
    
    event.target.value = value; // Ensure input shows the clamped value
    appState.composition[role] = value;
    updateAllRoleDisplays();
}

/**
 * Update all role-related displays after a change
 */
function updateAllRoleDisplays() {
    updateTotalXPDisplay();
    updateThreatAssessmentDisplay();
    updateMonsterStatsDisplay();
}

/**
 * Handle clear composition button
 */
function handleClearComposition() {
    // Reset all composition values
    for (const role in appState.composition) {
        appState.composition[role] = 0;
    }
    
    // Update all inputs
    elements.roleInputs.forEach(input => {
        const role = input.dataset.role;
        input.value = 0;
    });
    
    updateAllDisplays();
}

/**
 * Handle save encounter button
 */
function handleSaveEncounter() {
    const encounter = createEncounter(
        appState.partySize,
        appState.partyLevel,
        appState.selectedThreat,
        appState.composition
    );
    
    if (saveEncounter(encounter)) {
        updateSavedEncountersDisplay();
        showNotification('Encounter saved successfully!', 'success');
    } else {
        showNotification('Failed to save encounter', 'error');
    }
}

/**
 * Handle clear all saved encounters
 */
function handleClearAllSaved() {
    if (confirm('Are you sure you want to delete all saved encounters?')) {
        if (clearAllEncounters()) {
            updateSavedEncountersDisplay();
            showNotification('All encounters cleared', 'success');
        } else {
            showNotification('Failed to clear encounters', 'error');
        }
    }
}

/**
 * Handle export as text
 */
function handleExportText() {
    const encounter = createEncounter(
        appState.partySize,
        appState.partyLevel,
        appState.selectedThreat,
        appState.composition
    );
    
    elements.exportOutput.value = exportEncounterText(encounter, appState.currentStatsChart);
}

/**
 * Handle export as JSON
 */
function handleExportJSON() {
    const encounter = createEncounter(
        appState.partySize,
        appState.partyLevel,
        appState.selectedThreat,
        appState.composition
    );
    
    elements.exportOutput.value = exportEncounterJSON(encounter);
}

/**
 * Handle export monster statistics as image
 */
async function handleExportStatsImage() {
    // Store original text at function scope
    const originalText = elements.exportStatsImageBtn.textContent;
    
    try {
        // Show loading state
        elements.exportStatsImageBtn.textContent = 'Generating...';
        elements.exportStatsImageBtn.disabled = true;
        
        // Create a temporary container for the image
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = '800px';
        container.style.background = 'white';
        container.style.padding = '20px';
        container.style.fontFamily = 'system-ui, -apple-system, sans-serif';
        
        // Rebuild the content with clean HTML structure for image export
        const statsContainer = document.createElement('div');
        
        // Generate monster cards with clean inline styling
        for (const [role, count] of Object.entries(appState.composition)) {
            if (count > 0) {
                const roleData = ROLES[role];
                const stats = getMonsterStats(role, appState.partyLevel, appState.currentStatsChart);
                
                const card = document.createElement('div');
                card.style.cssText = `
                    background-color: #F9FAFB;
                    padding: 16px;
                    margin-bottom: 16px;
                    border-radius: 8px;
                    border: 1px solid #E5E7EB;
                    position: relative;
                `;
                
                card.innerHTML = `
                    <div style="display: table; width: 100%; margin-bottom: 12px;">
                        <div style="display: table-cell; vertical-align: middle;">
                            <h3 style="font-size: 18px; font-weight: bold; color: #2D1B69; margin: 0;">${roleData.emoji} ${roleData.name}</h3>
                        </div>
                        <div style="display: table-cell; vertical-align: middle; text-align: right;">
                            <span style="background-color: #2D1B69; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">Level ${stats.level}</span>
                        </div>
                    </div>
                    
                    <div style="display: table; width: 100%; table-layout: fixed;">
                        <div style="display: table-row;">
                            <div style="display: table-cell; text-align: center; padding: 8px; width: 25%;">
                                <div style="font-weight: 500; color: #6B7280; font-size: 12px; margin-bottom: 4px;">Count</div>
                                <div style="font-size: 20px; font-weight: bold; color: #2D1B69;">${count}</div>
                            </div>
                            <div style="display: table-cell; text-align: center; padding: 8px; width: 25%;">
                                <div style="font-weight: 500; color: #6B7280; font-size: 12px; margin-bottom: 4px;">HP</div>
                                <div style="font-size: 20px; font-weight: bold; color: #DC2626;">${stats.hp}</div>
                            </div>
                            <div style="display: table-cell; text-align: center; padding: 8px; width: 25%;">
                                <div style="font-weight: 500; color: #6B7280; font-size: 12px; margin-bottom: 4px;">AC</div>
                                <div style="font-size: 20px; font-weight: bold; color: #2563EB;">${stats.ac}</div>
                            </div>
                            <div style="display: table-cell; text-align: center; padding: 8px; width: 25%;">
                                <div style="font-weight: 500; color: #6B7280; font-size: 12px; margin-bottom: 4px;">Attack</div>
                                <div style="font-size: 20px; font-weight: bold; color: #059669;">+${stats.attackBonus}</div>
                            </div>
                        </div>
                        <div style="display: table-row;">
                            <div style="display: table-cell; text-align: center; padding: 8px;">
                                <div style="font-weight: 500; color: #6B7280; font-size: 12px; margin-bottom: 4px;">Fort</div>
                                <div style="font-weight: bold; color: #374151;">+${stats.fortitude}</div>
                            </div>
                            <div style="display: table-cell; text-align: center; padding: 8px;">
                                <div style="font-weight: 500; color: #6B7280; font-size: 12px; margin-bottom: 4px;">Ref</div>
                                <div style="font-weight: bold; color: #374151;">+${stats.reflex}</div>
                            </div>
                            <div style="display: table-cell; text-align: center; padding: 8px;">
                                <div style="font-weight: 500; color: #6B7280; font-size: 12px; margin-bottom: 4px;">Will</div>
                                <div style="font-weight: bold; color: #374151;">+${stats.will}</div>
                            </div>
                            <div style="display: table-cell; text-align: center; padding: 8px;">
                                <div style="font-weight: 500; color: #6B7280; font-size: 12px; margin-bottom: 4px;">Perc</div>
                                <div style="font-weight: bold; color: #374151;">+${stats.perception}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 12px;">
                        <div style="display: table; width: 100%; table-layout: fixed;">
                            <div style="display: table-row;">
                                <div style="display: table-cell; padding: 4px; width: 50%;">
                                    <div style="font-weight: 500; color: #6B7280; font-size: 12px;">Spell DC</div>
                                    <div style="font-weight: bold; color: #374151;">${stats.spellDC}</div>
                                </div>
                                <div style="display: table-cell; padding: 4px; width: 50%;">
                                    <div style="font-weight: 500; color: #6B7280; font-size: 12px;">XP Each</div>
                                    <div style="font-weight: bold; color: #F59E0B;">${roleData.xp}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 8px;">
                            <div style="font-weight: 500; color: #6B7280; font-size: 12px; margin-bottom: 4px;">Damage</div>
                            <div style="display: table; width: 100%; table-layout: fixed; font-size: 11px;">
                                <div style="display: table-row;">
                                    <div style="display: table-cell; padding: 2px; width: 25%;">
                                        <strong>Low:</strong> ${stats.lowDamage}
                                    </div>
                                    <div style="display: table-cell; padding: 2px; width: 25%;">
                                        <strong>Moderate:</strong> ${stats.moderateDamage}
                                    </div>
                                    <div style="display: table-cell; padding: 2px; width: 25%;">
                                        <strong>Severe:</strong> ${stats.severeDamage}
                                    </div>
                                    <div style="display: table-cell; padding: 2px; width: 25%;">
                                        <strong>Extreme:</strong> ${stats.extremeDamage}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                statsContainer.appendChild(card);
            }
        }
        
        // Create header for the image
        const header = document.createElement('div');
        header.innerHTML = `
            <h1 style="color: #2D1B69; font-size: 24px; font-weight: bold; margin-bottom: 16px; text-align: center;">
                Pathfinder 2e Monster Statistics
            </h1>
            <div style="color: #6B7280; font-size: 14px; margin-bottom: 20px; text-align: center;">
                Party: ${appState.partySize} characters (Level ${appState.partyLevel}) - ${THREATS[appState.selectedThreat].name}
            </div>
        `;
        
        container.appendChild(header);
        container.appendChild(statsContainer);
        document.body.appendChild(container);
        
        // Generate the image using html2canvas
        const canvas = await html2canvas(container, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            allowTaint: false
        });
        
        // Remove the temporary container
        document.body.removeChild(container);
        
        // Create download link
        const link = document.createElement('a');
        link.download = `pathfinder-monster-stats-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success notification
        showNotification('Monster statistics exported as image!', 'success');
        
    } catch (error) {
        console.error('Failed to export image:', error);
        showNotification('Failed to export image. Please try again.', 'error');
    } finally {
        // Restore button state
        elements.exportStatsImageBtn.textContent = originalText;
        elements.exportStatsImageBtn.disabled = hasNoMonsters();
    }
}

/**
 * Check if there are no monsters in the current composition
 */
function hasNoMonsters() {
    return Object.values(appState.composition).every(count => count === 0);
}

// ======= Display Update Functions =======

/**
 * Update all displays
 */
function updateAllDisplays() {
    updateTargetXPDisplay();
    updateTotalXPDisplay();
    updateThreatAssessmentDisplay();
    updateMonsterStatsDisplay();
    updateTemplatesDisplay();
    updateSavedEncountersDisplay();
}

/**
 * Update target XP display
 */
function updateTargetXPDisplay() {
    const targetXP = calculateTargetXP(appState.partySize, appState.selectedThreat);
    elements.targetXPSpan.textContent = targetXP;
}

/**
 * Update total XP display
 */
function updateTotalXPDisplay() {
    const totalXP = calculateTotalXP(appState.composition);
    elements.totalXPSpan.textContent = totalXP;
}

/**
 * Update threat assessment display
 */
function updateThreatAssessmentDisplay() {
    const currentXP = calculateTotalXP(appState.composition);
    const targetXP = calculateTargetXP(appState.partySize, appState.selectedThreat);
    const assessment = getThreatAssessment(currentXP, targetXP);
    
    elements.threatStatusDiv.textContent = assessment.status;
    elements.threatStatusDiv.className = `mt-2 p-2 rounded-md text-center text-sm font-medium ${assessment.class}`;
}

/**
 * Update role count display
 * @param {string} role - Monster role
 * @param {number} count - Number of monsters
 */
function updateRoleCountDisplay(role, count) {
    const countSpan = document.querySelector(`.${role}-count`);
    if (countSpan) {
        countSpan.textContent = count;
    }
}

/**
 * Update stats chart button styles
 * @param {boolean} useStandards - Whether standards chart is active
 */
function updateStatsChartButtons(useStandards) {
    if (useStandards) {
        elements.statsStandardsBtn.classList.add('bg-pf-dark', 'text-white');
        elements.statsStandardsBtn.classList.remove('bg-gray-200', 'text-gray-700');
        elements.statsPublishedBtn.classList.add('bg-gray-200', 'text-gray-700');
        elements.statsPublishedBtn.classList.remove('bg-pf-dark', 'text-white');
    } else {
        elements.statsPublishedBtn.classList.add('bg-pf-dark', 'text-white');
        elements.statsPublishedBtn.classList.remove('bg-gray-200', 'text-gray-700');
        elements.statsStandardsBtn.classList.add('bg-gray-200', 'text-gray-700');
        elements.statsStandardsBtn.classList.remove('bg-pf-dark', 'text-white');
    }
}

/**
 * Update monster statistics display
 */
function updateMonsterStatsDisplay() {
    const container = elements.monsterStats;
    container.innerHTML = '';
    
    let hasMonsters = false;
    
    for (const [role, count] of Object.entries(appState.composition)) {
        if (count > 0) {
            hasMonsters = true;
            const roleData = ROLES[role];
            const stats = getMonsterStats(role, appState.partyLevel, appState.currentStatsChart);
            
            const card = createMonsterStatsCard(role, count, roleData, stats);
            container.appendChild(card);
        }
    }
    
    if (!hasMonsters) {
        container.innerHTML = '<div class="text-center text-gray-500 py-8">Add monsters to see their statistics</div>';
    }
    
    // Update export image button state
    elements.exportStatsImageBtn.disabled = !hasMonsters;
}

/**
 * Create monster statistics card element
 * @param {string} role - Monster role
 * @param {number} count - Number of monsters
 * @param {Object} roleData - Role configuration data
 * @param {Object} stats - Monster statistics
 * @returns {HTMLElement} Card element
 */
function createMonsterStatsCard(role, count, roleData, stats) {
    const card = document.createElement('div');
    card.className = 'monster-card bg-gray-50 p-4 rounded-lg';
    
    card.innerHTML = `
        <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold text-pf-dark">${roleData.emoji} ${roleData.name}</h3>
            <span class="bg-pf-dark text-white px-2 py-1 rounded text-sm">Level ${stats.level}</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div class="text-center">
                <div class="font-medium text-gray-600">Count</div>
                <div class="text-xl font-bold text-pf-dark">${count}</div>
            </div>
            <div class="text-center">
                <div class="font-medium text-gray-600">HP</div>
                <div class="text-xl font-bold text-red-600">${stats.hp}</div>
            </div>
            <div class="text-center">
                <div class="font-medium text-gray-600">AC</div>
                <div class="text-xl font-bold text-blue-600">${stats.ac}</div>
            </div>
            <div class="text-center">
                <div class="font-medium text-gray-600">Attack</div>
                <div class="text-xl font-bold text-green-600">+${stats.attackBonus}</div>
            </div>
        </div>
        <div class="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div class="text-center">
                <div class="font-medium text-gray-600">Fort</div>
                <div class="font-bold">+${stats.fortitude}</div>
            </div>
            <div class="text-center">
                <div class="font-medium text-gray-600">Ref</div>
                <div class="font-bold">+${stats.reflex}</div>
            </div>
            <div class="text-center">
                <div class="font-medium text-gray-600">Will</div>
                <div class="font-bold">+${stats.will}</div>
            </div>
            <div class="text-center">
                <div class="font-medium text-gray-600">Perc</div>
                <div class="font-bold">+${stats.perception}</div>
            </div>
        </div>
        <div class="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div>
                <div class="font-medium text-gray-600">Spell DC</div>
                <div class="font-bold">${stats.spellDC}</div>
            </div>
            <div>
                <div class="font-medium text-gray-600">XP Each</div>
                <div class="font-bold text-pf-gold">${roleData.xp}</div>
            </div>
        </div>
        <div class="mt-3 pt-3 border-t border-gray-200">
            <div class="text-xs font-medium text-gray-600 mb-2">Damage</div>
            <div class="grid grid-cols-2 gap-2 text-xs">
                <div>
                    <span class="font-medium">Low:</span> ${stats.lowDamage}
                </div>
                <div>
                    <span class="font-medium">Moderate:</span> ${stats.moderateDamage}
                </div>
                <div>
                    <span class="font-medium">Severe:</span> ${stats.severeDamage}
                </div>
                <div>
                    <span class="font-medium">Extreme:</span> ${stats.extremeDamage}
                </div>
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Update templates display
 */
function updateTemplatesDisplay() {
    const container = elements.templateList;
    container.innerHTML = '';
    
    for (const [key, template] of Object.entries(TEMPLATES)) {
        if (template.threat.includes(appState.selectedThreat)) {
            const button = document.createElement('button');
            button.className = 'template-btn w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition-colors';
            button.textContent = template.name;
            button.onclick = () => loadTemplate(template);
            container.appendChild(button);
        }
    }
}

/**
 * Update saved encounters display
 */
function updateSavedEncountersDisplay() {
    const saved = getSavedEncounters();
    const container = elements.savedEncounters;
    
    if (saved.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-4">No saved encounters</div>';
        return;
    }
    
    container.innerHTML = '';
    
    saved.forEach(encounter => {
        const div = document.createElement('div');
        div.className = 'bg-gray-50 p-3 rounded-md';
        
        const compositionText = Object.entries(encounter.composition || {})
            .filter(([role, count]) => count > 0)
            .map(([role, count]) => `${count} ${ROLES[role].name}${count > 1 ? 's' : ''}`)
            .join(', ') || 'Empty';
        
        div.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div class="text-sm font-medium">
                    Party: ${encounter.partySize} (Lvl ${encounter.partyLevel}) - ${THREATS[encounter.threatLevel].name}
                </div>
                <div class="flex space-x-1">
                    <button onclick="loadSavedEncounter(${encounter.id})" class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Load</button>
                    <button onclick="deleteSavedEncounter(${encounter.id})" class="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Delete</button>
                </div>
            </div>
            <div class="text-xs text-gray-600">${compositionText}</div>
            <div class="text-xs text-gray-500 mt-1">XP: ${encounter.totalXP}/${encounter.targetXP} - ${encounter.timestamp}</div>
        `;
        
        container.appendChild(div);
    });
}

// ======= Template and Saved Encounter Functions =======

/**
 * Load a template into the current composition
 * @param {Object} template - Template data
 */
function loadTemplate(template) {
    // Reset composition
    for (const role in appState.composition) {
        appState.composition[role] = 0;
    }
    
    // Apply template
    for (const [role, count] of Object.entries(template)) {
        if (appState.composition.hasOwnProperty(role)) {
            appState.composition[role] = count;
        }
    }
    
    // Update inputs and displays
    elements.roleInputs.forEach(input => {
        const role = input.dataset.role;
        input.value = appState.composition[role];
    });
    
    updateAllDisplays();
}

/**
 * Load a saved encounter (global function for onclick handlers)
 * @param {number} id - Encounter ID
 */
window.loadSavedEncounter = function(id) {
    const encounter = loadEncounter(id);
    
    if (encounter) {
        appState.partySize = encounter.partySize;
        appState.partyLevel = encounter.partyLevel;
        appState.selectedThreat = encounter.threatLevel;
        appState.composition = { ...encounter.composition };
        
        // Update UI controls
        elements.partySizeInput.value = appState.partySize;
        elements.partyLevelInput.value = appState.partyLevel;
        elements.threatLevelSelect.value = appState.selectedThreat;
        
        // Update inputs
        elements.roleInputs.forEach(input => {
            const role = input.dataset.role;
            input.value = appState.composition[role];
        });
        
        updateAllDisplays();
        showNotification('Encounter loaded successfully!', 'success');
    } else {
        showNotification('Failed to load encounter', 'error');
    }
};

/**
 * Delete a saved encounter (global function for onclick handlers)
 * @param {number} id - Encounter ID
 */
window.deleteSavedEncounter = function(id) {
    if (deleteEncounter(id)) {
        updateSavedEncountersDisplay();
        showNotification('Encounter deleted', 'success');
    } else {
        showNotification('Failed to delete encounter', 'error');
    }
};

// ======= Utility Functions =======

/**
 * Show a temporary notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-md text-white z-50 transition-opacity duration-300 ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        'bg-blue-500'
    }`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
