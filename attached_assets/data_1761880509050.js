// Pathfinder 2e Encounter Builder - Static Data

// Threat level definitions with XP values and party size adjustments
const THREATS = {
    trivial:  { xp:  40, adjustment: 10, name: 'Trivial'  },
    low:      { xp:  60, adjustment: 20, name: 'Low'      },
    moderate: { xp:  80, adjustment: 20, name: 'Moderate' },
    severe:   { xp: 120, adjustment: 30, name: 'Severe'   },
    extreme:  { xp: 160, adjustment: 40, name: 'Extreme'  },
};

// Monster role definitions with level modifiers, XP values, and display info
const ROLES = {
    minion:     { levelMod: -4, xp:  10, name: 'Minion',      emoji: '🗡️' },
    lieutenant: { levelMod:  0, xp:  40, name: 'Lieutenant',  emoji: '⚔️' },
    boss:       { levelMod:  2, xp:  80, name: 'Boss',        emoji: '👑' },
    eliteBoss:  { levelMod:  3, xp: 120, name: 'Elite Boss',  emoji: '🏆' },
    apexBoss:   { levelMod:  4, xp: 160, name: 'Apex Boss',   emoji: '💀' },
};

// Official design standards statistics by level
const STATS_STANDARDS = {
    "-1": { hp:  8, ac: 14, spellDC: 13, fortitude:  4, reflex:  6, will:  4, perception:  5, attackBonus:  6, lowDamage:"1d4 (2)", moderateDamage:"1d4 (3)", severeDamage:"1d4+1 (3)", extremeDamage:"1d6+1 (4)" },
    "0":  { hp: 16, ac: 15, spellDC: 13, fortitude:  6, reflex:  6, will:  5, perception:  5, attackBonus:  8, lowDamage:"1d4+1 (3)", moderateDamage:"1d4+2 (4)", severeDamage:"1d6+2 (5)", extremeDamage:"1d6+3 (6)" },
    "1":  { hp: 20, ac: 16, spellDC: 14, fortitude:  6, reflex:  7, will:  6, perception:  6, attackBonus:  9, lowDamage:"1d4+2 (4)", moderateDamage:"1d6+2 (5)", severeDamage:"1d6+3 (6)", extremeDamage:"1d8+4 (8)" },
    "2":  { hp: 31, ac: 17, spellDC: 15, fortitude:  8, reflex:  8, will:  7, perception:  8, attackBonus: 10, lowDamage:"1d6+3 (6)", moderateDamage:"1d8+4 (8)", severeDamage:"1d10+4 (9)", extremeDamage:"1d12+4 (11)" },
    "3":  { hp: 46, ac: 18, spellDC: 17, fortitude:  9, reflex:  9, will:  8, perception:  9, attackBonus: 11, lowDamage:"1d6+5 (8)", moderateDamage:"1d8+6 (10)", severeDamage:"1d10+6 (12)", extremeDamage:"1d12+8 (15)" },
    "4":  { hp: 62, ac: 20, spellDC: 18, fortitude: 11, reflex: 11, will: 10, perception: 11, attackBonus: 12, lowDamage:"2d4+4 (9)", moderateDamage:"2d6+5 (12)", severeDamage:"2d8+5 (14)", extremeDamage:"2d10+7 (18)" },
    "5":  { hp: 77, ac: 21, spellDC: 19, fortitude: 12, reflex: 12, will: 11, perception: 12, attackBonus: 13, lowDamage:"2d4+6 (11)", moderateDamage:"2d6+6 (13)", severeDamage:"2d8+7 (16)", extremeDamage:"2d12+7 (20)" },
    "6":  { hp:100, ac: 24, spellDC: 21, fortitude: 14, reflex: 14, will: 13, perception: 14, attackBonus: 15, lowDamage:"2d4+7 (12)", moderateDamage:"2d6+8 (15)", severeDamage:"2d8+9 (18)", extremeDamage:"2d12+10 (23)" },
    "7":  { hp:116, ac: 25, spellDC: 22, fortitude: 15, reflex: 15, will: 14, perception: 15, attackBonus: 16, lowDamage:"2d6+6 (13)", moderateDamage:"2d8+8 (17)", severeDamage:"2d10+9 (20)", extremeDamage:"2d12+12 (25)" },
    "8":  { hp:136, ac: 27, spellDC: 23, fortitude: 17, reflex: 16, will: 15, perception: 16, attackBonus: 18, lowDamage:"2d6+8 (15)", moderateDamage:"2d8+9 (18)", severeDamage:"2d10+11 (22)", extremeDamage:"2d12+15 (28)" },
    "9":  { hp:159, ac: 28, spellDC: 25, fortitude: 18, reflex: 18, will: 17, perception: 18, attackBonus: 19, lowDamage:"2d6+9 (16)", moderateDamage:"2d8+11 (20)", severeDamage:"2d10+13 (24)", extremeDamage:"2d12+17 (30)" },
    "10": { hp:185, ac: 29, spellDC: 26, fortitude: 20, reflex: 19, will: 18, perception: 19, attackBonus: 21, lowDamage:"2d6+10 (17)", moderateDamage:"2d10+11 (22)", severeDamage:"2d12+13 (26)", extremeDamage:"2d12+20 (33)" },
    "11": { hp:195, ac: 31, spellDC: 27, fortitude: 21, reflex: 21, will: 20, perception: 21, attackBonus: 22, lowDamage:"2d8+10 (19)", moderateDamage:"2d10+12 (23)", severeDamage:"2d12+15 (28)", extremeDamage:"2d12+22 (35)" },
    "12": { hp:222, ac: 33, spellDC: 29, fortitude: 23, reflex: 22, will: 22, perception: 22, attackBonus: 24, lowDamage:"3d6+10 (20)", moderateDamage:"3d8+12 (25)", severeDamage:"3d10+14 (30)", extremeDamage:"3d12+19 (38)" },
    "13": { hp:238, ac: 34, spellDC: 30, fortitude: 24, reflex: 23, will: 23, perception: 24, attackBonus: 25, lowDamage:"3d6+11 (21)", moderateDamage:"3d8+14 (27)", severeDamage:"3d10+16 (32)", extremeDamage:"3d12+21 (40)" },
    "14": { hp:267, ac: 36, spellDC: 31, fortitude: 25, reflex: 25, will: 25, perception: 25, attackBonus: 27, lowDamage:"3d6+13 (23)", moderateDamage:"3d8+15 (28)", severeDamage:"3d10+18 (34)", extremeDamage:"3d12+24 (43)" },
    "15": { hp:287, ac: 37, spellDC: 33, fortitude: 27, reflex: 26, will: 26, perception: 27, attackBonus: 28, lowDamage:"3d6+14 (24)", moderateDamage:"3d10+14 (30)", severeDamage:"3d12+17 (36)", extremeDamage:"3d12+26 (45)" },
    "16": { hp:266, ac: 37, spellDC: 34, fortitude: 28, reflex: 28, will: 27, perception: 28, attackBonus: 30, lowDamage:"3d6+15 (25)", moderateDamage:"3d10+15 (31)", severeDamage:"3d12+18 (37)", extremeDamage:"3d12+29 (48)" },
    "17": { hp:291, ac: 39, spellDC: 35, fortitude: 30, reflex: 29, will: 29, perception: 30, attackBonus: 31, lowDamage:"3d6+16 (26)", moderateDamage:"3d10+16 (32)", severeDamage:"3d12+19 (38)", extremeDamage:"3d12+31 (50)" },
    "18": { hp:309, ac: 40, spellDC: 37, fortitude: 31, reflex: 29, will: 30, perception: 31, attackBonus: 33, lowDamage:"3d6+17 (27)", moderateDamage:"3d10+17 (33)", severeDamage:"3d12+20 (40)", extremeDamage:"3d12+34 (53)" },
    "19": { hp:332, ac: 42, spellDC: 38, fortitude: 33, reflex: 32, will: 33, perception: 33, attackBonus: 34, lowDamage:"4d6+14 (28)", moderateDamage:"4d8+17 (35)", severeDamage:"4d10+20 (42)", extremeDamage:"4d12+29 (55)" },
    "20": { hp:392, ac: 45, spellDC: 39, fortitude: 34, reflex: 32, will: 34, perception: 35, attackBonus: 36, lowDamage:"4d6+15 (29)", moderateDamage:"4d8+19 (37)", severeDamage:"4d10+22 (44)", extremeDamage:"4d12+32 (58)" }
};

// Published monsters statistics by level (based on actual published creatures)
const STATS_PUBLISHED = {
    "-1": { hp:  8, ac: 14, spellDC: 13, fortitude:  4, reflex:  6, will:  4, perception:  5, attackBonus:  6, lowDamage:"1d4 (2)", moderateDamage:"1d4+1 (4)", severeDamage:"1d4+1 (4)", extremeDamage:"1d4+1 (4)" },
    "0":  { hp: 16, ac: 15, spellDC: 13, fortitude:  6, reflex:  6, will:  5, perception:  5, attackBonus:  8, lowDamage:"1d4+1 (3)", moderateDamage:"1d6+1 (5)", severeDamage:"1d8+1 (6)", extremeDamage:"2d6+1 (8)" },
    "1":  { hp: 20, ac: 16, spellDC: 14, fortitude:  6, reflex:  7, will:  6, perception:  6, attackBonus:  9, lowDamage:"1d4+2 (4)", moderateDamage:"1d6+2 (6)", severeDamage:"2d4+3 (8)", extremeDamage:"1d10+3 (9)" },
    "2":  { hp: 31, ac: 17, spellDC: 15, fortitude:  8, reflex:  8, will:  7, perception:  8, attackBonus: 10, lowDamage:"1d6+2 (6)", moderateDamage:"2d4+3 (8)", severeDamage:"2d6+2 (9)", extremeDamage:"2d8+2 (11)" },
    "3":  { hp: 46, ac: 18, spellDC: 17, fortitude:  9, reflex:  9, will:  8, perception:  9, attackBonus: 11, lowDamage:"1d8+3 (7)", moderateDamage:"2d6+3 (10)", severeDamage:"2d6+5 (12)", extremeDamage:"2d8+5 (14)" },
    "4":  { hp: 62, ac: 20, spellDC: 18, fortitude: 11, reflex: 11, will: 10, perception: 11, attackBonus: 12, lowDamage:"1d8+4 (8)", moderateDamage:"2d6+4 (11)", severeDamage:"3d6+4 (15)", extremeDamage:"3d8+5 (19)" },
    "5":  { hp: 77, ac: 21, spellDC: 19, fortitude: 12, reflex: 12, will: 11, perception: 12, attackBonus: 13, lowDamage:"2d4+5 (10)", moderateDamage:"2d6+6 (13)", severeDamage:"3d6+6 (17)", extremeDamage:"3d8+6 (20)" },
    "6":  { hp:100, ac: 24, spellDC: 21, fortitude: 14, reflex: 14, will: 13, perception: 14, attackBonus: 15, lowDamage:"2d6+4 (11)", moderateDamage:"3d6+6 (17)", severeDamage:"3d8+6 (20)", extremeDamage:"4d6+7 (21)" },
    "7":  { hp:116, ac: 25, spellDC: 22, fortitude: 15, reflex: 15, will: 14, perception: 15, attackBonus: 16, lowDamage:"2d6+5 (12)", moderateDamage:"3d6+7 (18)", severeDamage:"4d6+6 (20)", extremeDamage:"4d8+7 (25)" },
    "8":  { hp:136, ac: 27, spellDC: 23, fortitude: 17, reflex: 16, will: 15, perception: 16, attackBonus: 18, lowDamage:"2d8+4 (13)", moderateDamage:"3d6+8 (19)", severeDamage:"4d6+8 (22)", extremeDamage:"4d10+7 (29)" },
    "9":  { hp:159, ac: 28, spellDC: 25, fortitude: 18, reflex: 18, will: 17, perception: 18, attackBonus: 19, lowDamage:"2d8+5 (14)", moderateDamage:"3d6+9 (20)", severeDamage:"4d8+6 (24)", extremeDamage:"5d8+7 (30)" },
    "10": { hp:185, ac: 29, spellDC: 26, fortitude: 20, reflex: 19, will: 18, perception: 19, attackBonus: 21, lowDamage:"2d8+6 (15)", moderateDamage:"3d8+8 (22)", severeDamage:"5d6+9 (27)", extremeDamage:"5d8+8 (31)" },
    "11": { hp:195, ac: 31, spellDC: 27, fortitude: 21, reflex: 21, will: 20, perception: 21, attackBonus: 22, lowDamage:"2d10+4 (15)", moderateDamage:"3d8+9 (23)", severeDamage:"5d6+10 (28)", extremeDamage:"5d10+8 (36)" },
    "12": { hp:222, ac: 33, spellDC: 29, fortitude: 23, reflex: 22, will: 22, perception: 22, attackBonus: 24, lowDamage:"3d6+6 (16)", moderateDamage:"4d6+9 (23)", severeDamage:"5d8+8 (31)", extremeDamage:"6d8+9 (36)" },
    "13": { hp:238, ac: 34, spellDC: 30, fortitude: 24, reflex: 23, will: 23, perception: 24, attackBonus: 25, lowDamage:"3d6+7 (17)", moderateDamage:"4d6+11 (25)", severeDamage:"5d8+10 (33)", extremeDamage:"6d8+11 (38)" },
    "14": { hp:267, ac: 36, spellDC: 31, fortitude: 25, reflex: 25, will: 25, perception: 25, attackBonus: 27, lowDamage:"3d6+9 (19)", moderateDamage:"4d8+8 (26)", severeDamage:"6d6+12 (33)", extremeDamage:"6d10+8 (41)" },
    "15": { hp:287, ac: 37, spellDC: 33, fortitude: 27, reflex: 26, will: 26, perception: 27, attackBonus: 28, lowDamage:"3d8+6 (19)", moderateDamage:"4d8+9 (27)", severeDamage:"6d8+8 (35)", extremeDamage:"7d8+10 (41)" },
    "16": { hp:266, ac: 37, spellDC: 34, fortitude: 28, reflex: 28, will: 27, perception: 28, attackBonus: 30, lowDamage:"3d8+8 (21)", moderateDamage:"5d6+12 (29)", severeDamage:"6d8+10 (37)", extremeDamage:"7d10+9 (47)" },
    "17": { hp:291, ac: 39, spellDC: 35, fortitude: 30, reflex: 29, will: 29, perception: 30, attackBonus: 31, lowDamage:"4d6+8 (22)", moderateDamage:"5d8+8 (31)", severeDamage:"6d8+12 (39)", extremeDamage:"7d10+11 (49)" },
    "18": { hp:309, ac: 40, spellDC: 37, fortitude: 31, reflex: 29, will: 30, perception: 31, attackBonus: 33, lowDamage:"4d6+10 (24)", moderateDamage:"5d8+10 (33)", severeDamage:"7d8+10 (42)", extremeDamage:"8d8+12 (48)" },
    "19": { hp:332, ac: 42, spellDC: 38, fortitude: 33, reflex: 32, will: 33, perception: 33, attackBonus: 34, lowDamage:"4d8+6 (24)", moderateDamage:"5d10+10 (38)", severeDamage:"7d8+13 (44)", extremeDamage:"8d10+10 (54)" },
    "20": { hp:392, ac: 45, spellDC: 39, fortitude: 34, reflex: 32, will: 34, perception: 35, attackBonus: 36, lowDamage:"4d8+8 (26)", moderateDamage:"5d10+12 (40)", severeDamage:"8d8+12 (48)", extremeDamage:"9d8+16 (56)" }
};

// Pre-built encounter templates organized by threat level
const TEMPLATES = {
    // Trivial encounters
    trivial_minions4:  { name: '4 Minions', boss:0, lieutenant:0, minion:4, eliteBoss:0, apexBoss:0, xp: 40, threat: ['trivial'] },
    trivial_minions2:  { name: '2 Minions', boss:0, lieutenant:0, minion:2, eliteBoss:0, apexBoss:0, xp: 20, threat: ['trivial'] },

    // Low threat encounters
    low_lt_minions:    { name: '1 Lieutenant + 2 Minions', boss:0, lieutenant:1, minion:2, eliteBoss:0, apexBoss:0, xp: 60, threat: ['low'] },
    low_minions6:      { name: '6 Minions', boss:0, lieutenant:0, minion:6, eliteBoss:0, apexBoss:0, xp: 60, threat: ['low'] },
    low_solo_lt:       { name: '1 Lieutenant', boss:0, lieutenant:1, minion:0, eliteBoss:0, apexBoss:0, xp: 40, threat: ['low'] },

    // Moderate threat encounters
    mod_2lt:           { name: '2 Lieutenants', boss:0, lieutenant:2, minion:0, eliteBoss:0, apexBoss:0, xp: 80, threat: ['moderate'] },
    mod_lt_4min:       { name: '1 Lieutenant + 4 Minions', boss:0, lieutenant:1, minion:4, eliteBoss:0, apexBoss:0, xp: 80, threat: ['moderate'] },
    mod_minions8:      { name: '8 Minions', boss:0, lieutenant:0, minion:8, eliteBoss:0, apexBoss:0, xp: 80, threat: ['moderate'] },
    mod_boss:          { name: '1 Boss', boss:1, lieutenant:0, minion:0, eliteBoss:0, apexBoss:0, xp: 80, threat: ['moderate'] },

    // Severe threat encounters
    sev_3lt:           { name: '3 Lieutenants', boss:0, lieutenant:3, minion:0, eliteBoss:0, apexBoss:0, xp: 120, threat: ['severe'] },
    sev_boss_2min:     { name: '1 Boss + 2 Minions', boss:1, lieutenant:0, minion:2, eliteBoss:0, apexBoss:0, xp: 100, threat: ['severe'] },
    sev_boss_lt:       { name: '1 Boss + 1 Lieutenant', boss:1, lieutenant:1, minion:0, eliteBoss:0, apexBoss:0, xp: 120, threat: ['severe'] },
    sev_elite:         { name: '1 Elite Boss', boss:0, lieutenant:0, minion:0, eliteBoss:1, apexBoss:0, xp: 120, threat: ['severe'] },

    // Extreme threat encounters
    ext_4lt:           { name: '4 Lieutenants', boss:0, lieutenant:4, minion:0, eliteBoss:0, apexBoss:0, xp: 160, threat: ['extreme'] },
    ext_elite_2min:    { name: '1 Elite Boss + 2 Minions', boss:0, lieutenant:0, minion:2, eliteBoss:1, apexBoss:0, xp: 140, threat: ['extreme'] },
    ext_elite_lt:      { name: '1 Elite Boss + 1 Lieutenant', boss:0, lieutenant:1, minion:0, eliteBoss:1, apexBoss:0, xp: 160, threat: ['extreme'] },
    ext_apex:          { name: '1 Apex Boss', boss:0, lieutenant:0, minion:0, eliteBoss:0, apexBoss:1, xp: 160, threat: ['extreme'] },
};
