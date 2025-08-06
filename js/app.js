// Main Application JavaScript
class OnceHumanApp {
    constructor() {
        this.currentSection = 'home';
        this.builds = this.loadBuilds();
        this.currentTheme = this.loadTheme();
        this.currentTableLanguage = this.loadTableLanguage();
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupSearch();
        this.setupBuildTools();
        this.loadInitialData();
    }

    // Theme Management
    setupTheme() {
        // Apply saved theme
        this.applyTheme(this.currentTheme);
        
        // Setup theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    loadTheme() {
        // Load theme from localStorage, default to 'dark'
        const savedTheme = localStorage.getItem('onceHumanTheme');
        return savedTheme || 'dark';
    }

    loadTableLanguage() {
        // Load table language from localStorage, default to 'en'
        const savedLanguage = localStorage.getItem('weaponsTableLanguage');
        return savedLanguage || 'en';
    }

    saveTheme(theme) {
        localStorage.setItem('onceHumanTheme', theme);
    }

    applyTheme(theme) {
        const body = document.body;
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.querySelector('.theme-icon');
        const themeText = document.querySelector('.theme-text');
        
        if (theme === 'light') {
            body.setAttribute('data-theme', 'light');
            if (themeIcon) themeIcon.textContent = '☀️';
            if (themeText) themeText.textContent = 'Light';
        } else {
            body.removeAttribute('data-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
            if (themeText) themeText.textContent = 'Dark';
        }
        
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        this.saveTheme(newTheme);
        
        // Show notification
        this.showNotification(`Switched to ${newTheme} theme`, 'info');
        
        console.log(`Theme switched to: ${newTheme}`);
    }

    // Navigation System
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const section = link.dataset.section;
                this.navigateToSection(section);
                
                // Update active nav item
                const activeItem = document.querySelector('.nav-item.active');
                if (activeItem) {
                    activeItem.classList.remove('active');
                }
                link.parentElement.classList.add('active');
            });
        });
    }

    navigateToSection(section) {
        // Hide current section
        const currentSection = document.querySelector(`.content-section.active`);
        if (currentSection) {
            currentSection.classList.remove('active');
        }

        // Show new section
        const newSection = document.getElementById(`${section}-section`);
        if (newSection) {
            newSection.classList.add('active');
            this.currentSection = section;
            this.updatePageTitle(section);
            this.loadSectionContent(section);
        }
    }

    updatePageTitle(section) {
        const titles = {
            'home': 'Welcome to Once Human Build Sharing',
            'weapons': 'Weapons Database',
            'mods': 'Mods & Modifications',
            'armor': 'Armor & Equipment',
            'set-build': 'Build Creator & Manager',
            'animals': 'Animals & Companions',
            'food': 'Food & Consumables'
        };
        
        document.getElementById('page-title').textContent = titles[section] || 'Once Human Build Sharing';
    }

    // Search System
    setupSearch() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                this.searchItems(query);
            }
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    searchItems(query) {
        console.log(`Searching for: ${query}`);
        // TODO: Implement search functionality
        // This will search through JSON data files when they're loaded
    }

    // Build Management System
    setupBuildTools() {
        const createBuildBtn = document.getElementById('create-build-btn');
        const importBuildBtn = document.getElementById('import-build-btn');
        const importModal = document.getElementById('import-modal');
        const importConfirmBtn = document.getElementById('import-confirm-btn');
        const importCancelBtn = document.getElementById('import-cancel-btn');
        const importText = document.getElementById('import-text');

        // Build Editor Elements
        const buildEditorModal = document.getElementById('build-editor-modal');
        const buildNameInput = document.getElementById('build-name-input');
        const saveBuildBtn = document.getElementById('save-build-btn');
        const closeEditorBtn = document.getElementById('close-editor-btn');

        console.log('Build Tools Elements Check:');
        console.log('createBuildBtn:', !!createBuildBtn);
        console.log('buildEditorModal:', !!buildEditorModal);
        console.log('importModal:', !!importModal);
        
        if (!createBuildBtn) {
            console.error('Create Build button not found!');
            return;
        }
        
        if (!buildEditorModal) {
            console.error('Build Editor Modal not found!');
            return;
        }

        // Create new build
        createBuildBtn.addEventListener('click', () => {
            console.log('Create New Build button clicked');
            this.createNewBuild();
        });

        // Import build modal
        importBuildBtn.addEventListener('click', () => {
            importModal.classList.remove('hidden');
            importText.value = '';
            importText.focus();
        });

        // Import confirm
        importConfirmBtn.addEventListener('click', () => {
            const buildString = importText.value.trim();
            if (buildString) {
                this.importBuild(buildString);
            }
            importModal.classList.add('hidden');
        });

        // Import cancel
        importCancelBtn.addEventListener('click', () => {
            importModal.classList.add('hidden');
        });

        // Close import modal on backdrop click
        importModal.addEventListener('click', (e) => {
            if (e.target === importModal) {
                importModal.classList.add('hidden');
            }
        });

        // Build Editor Event Listeners
        saveBuildBtn.addEventListener('click', () => {
            this.saveBuildFromEditor();
        });

        closeEditorBtn.addEventListener('click', () => {
            this.closeBuildEditor();
        });

        // Close editor modal on backdrop click
        buildEditorModal.addEventListener('click', (e) => {
            if (e.target === buildEditorModal) {
                this.closeBuildEditor();
            }
        });

        // Setup change listeners for all selects
        this.setupEditorChangeListeners();
    }

    // Build Management Functions
    createNewBuild() {
        console.log('Creating new build...');
        const newBuild = {
            id: Date.now().toString(),
            name: 'New Build',
            equipment: {
                helmet: { item: null, mod: null },
                mask: { item: null, mod: null },
                top: { item: null, mod: null },
                bottom: { item: null, mod: null },
                gloves: { item: null, mod: null },
                shoes: { item: null, mod: null }
            },
            weapons: {
                weapon1: { item: null, mod: null },
                weapon2: { item: null, mod: null },
                weapon3: { item: null, mod: null }
            },
            created: new Date().toISOString(),
            modified: new Date().toISOString()
        };

        console.log('New build object:', newBuild);
        
        this.builds.push(newBuild);
        this.saveBuilds();
        this.displayBuilds();
        
        console.log('Opening build editor for:', newBuild.id);
        this.openBuildEditor(newBuild.id);
        
        console.log('Build creation completed');
    }

    importBuild(buildString) {
        try {
            const buildData = this.decodeBuildString(buildString);
            
            if (this.validateBuildData(buildData)) {
                buildData.id = Date.now().toString();
                buildData.imported = new Date().toISOString();
                
                this.builds.push(buildData);
                this.saveBuilds();
                this.displayBuilds();
                
                this.showNotification('Build imported successfully!', 'success');
                console.log('Imported build:', buildData);
            } else {
                throw new Error('Invalid build data');
            }
        } catch (error) {
            this.showNotification('Invalid build string!', 'error');
            console.error('Import error:', error);
        }
    }

    exportBuild(buildId) {
        const build = this.builds.find(b => b.id === buildId);
        if (build) {
            const buildString = this.encodeBuildString(build);
            this.copyToClipboard(buildString);
            this.showNotification('Build copied to clipboard!', 'success');
            return buildString;
        }
        return null;
    }

    // Build Encoding/Decoding
    encodeBuildString(buildData) {
        try {
            const jsonString = JSON.stringify(buildData);
            return btoa(unescape(encodeURIComponent(jsonString)));
        } catch (error) {
            console.error('Encoding error:', error);
            return null;
        }
    }

    decodeBuildString(buildString) {
        try {
            const jsonString = decodeURIComponent(escape(atob(buildString)));
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Decoding error:', error);
            throw new Error('Invalid build string format');
        }
    }

    validateBuildData(data) {
        return data && 
               typeof data === 'object' && 
               data.name && 
               data.equipment &&
               data.weapons &&
               typeof data.equipment === 'object' &&
               typeof data.weapons === 'object';
    }

    // Local Storage Management
    loadBuilds() {
        try {
            const saved = localStorage.getItem('onceHumanBuilds');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading builds:', error);
            return [];
        }
    }

    saveBuilds() {
        try {
            localStorage.setItem('onceHumanBuilds', JSON.stringify(this.builds));
        } catch (error) {
            console.error('Error saving builds:', error);
        }
    }

    // Content Loading
    loadSectionContent(section) {
        switch (section) {
            case 'weapons':
                this.loadWeapons();
                break;
            case 'mods':
                this.loadMods();
                break;
            case 'armor':
                this.loadArmor();
                break;
            case 'set-build':
                this.displayBuilds();
                break;
            case 'animals':
                this.loadAnimals();
                break;
            case 'food':
                this.loadFood();
                break;
        }
    }

    loadInitialData() {
        // Load sample data for demonstration
        this.createSampleData();
    }

    createSampleData() {
        // Sample builds for demonstration
        if (this.builds.length === 0) {
            const sampleBuilds = [
                {
                    id: 'sample1',
                    name: 'Assault Rifle Build',
                    equipment: {
                        helmet: { item: 'Combat Helmet', mod: 'Durability Boost' },
                        mask: { item: 'Gas Mask', mod: 'Filter Enhancement' },
                        top: { item: 'Tactical Vest', mod: 'Extra Pockets' },
                        bottom: { item: 'Combat Pants', mod: 'Knee Pads' },
                        gloves: { item: 'Tactical Gloves', mod: 'Grip Enhancement' },
                        shoes: { item: 'Combat Boots', mod: 'Silent Step' }
                    },
                    weapons: {
                        weapon1: { item: 'AR-15', mod: 'Red Dot Sight' },
                        weapon2: { item: 'Combat Knife', mod: 'Serrated Edge' },
                        weapon3: { item: null, mod: null }
                    },
                    created: new Date().toISOString(),
                    modified: new Date().toISOString()
                },
                {
                    id: 'sample2',
                    name: 'Sniper Build',
                    equipment: {
                        helmet: { item: 'Sniper Hood', mod: 'Camouflage' },
                        mask: { item: null, mod: null },
                        top: { item: 'Ghillie Suit', mod: 'Stealth Enhancement' },
                        bottom: { item: 'Camo Pants', mod: 'Movement Reduction' },
                        gloves: { item: 'Precision Gloves', mod: 'Steady Aim' },
                        shoes: { item: 'Stealth Boots', mod: 'Noise Reduction' }
                    },
                    weapons: {
                        weapon1: { item: 'Sniper Rifle', mod: '8x Scope' },
                        weapon2: { item: 'Pistol', mod: 'Silencer' },
                        weapon3: { item: null, mod: null }
                    },
                    created: new Date().toISOString(),
                    modified: new Date().toISOString()
                }
            ];
            
            this.builds = sampleBuilds;
            this.saveBuilds();
        }
    }

    // Content Display Functions
    displayBuilds() {
        const container = document.getElementById('builds-content');
        if (!container) return;

        container.innerHTML = '';

        if (this.builds.length === 0) {
            container.innerHTML = '<p class="no-content">No builds found. Create your first build!</p>';
            return;
        }

        this.builds.forEach(build => {
            const buildCard = this.createBuildCard(build);
            container.appendChild(buildCard);
        });
    }

    createBuildCard(build) {
        const card = document.createElement('div');
        card.className = 'build-card';
        
        // Get equipped items summary
        const equippedItems = this.getBuildSummary(build);
        
        card.innerHTML = `
            <div class="build-header">
                <h3>${build.name}</h3>
                <div class="build-actions">
                    <button onclick="app.openBuildEditor('${build.id}')" class="btn-edit">✏️ Edit</button>
                    <button onclick="app.exportBuild('${build.id}')" class="btn-export">📤 Export</button>
                    <button onclick="app.deleteBuild('${build.id}')" class="btn-delete">🗑️</button>
                </div>
            </div>
            <div class="build-content">
                <div class="build-section">
                    <strong>Equipment:</strong>
                    <div class="equipment-summary">
                        ${equippedItems.equipment}
                    </div>
                </div>
                <div class="build-section">
                    <strong>Weapons:</strong>
                    <div class="weapons-summary">
                        ${equippedItems.weapons}
                    </div>
                </div>
                <div class="build-meta">
                    <small>Created: ${new Date(build.created).toLocaleDateString()}</small>
                </div>
            </div>
        `;
        return card;
    }

    getBuildSummary(build) {
        const equipmentSlots = ['helmet', 'mask', 'top', 'bottom', 'gloves', 'shoes'];
        const weaponSlots = ['weapon1', 'weapon2', 'weapon3'];
        
        const equipmentList = equipmentSlots
            .map(slot => build.equipment[slot]?.item || 'Empty')
            .filter(item => item !== 'Empty')
            .join(', ') || 'No items equipped';
            
        const weaponsList = weaponSlots
            .map(slot => build.weapons[slot]?.item || null)
            .filter(item => item !== null)
            .join(', ') || 'No weapons equipped';
            
        return {
            equipment: equipmentList,
            weapons: weaponsList
        };
    }

    // Build Editor Functions
    openBuildEditor(buildId) {
        console.log('Opening build editor for build ID:', buildId);
        this.currentEditingBuildId = buildId;
        const build = this.builds.find(b => b.id === buildId);
        
        if (!build) {
            console.error('Build not found:', buildId);
            this.showNotification('Build not found!', 'error');
            return;
        }

        // Show modal
        const modal = document.getElementById('build-editor-modal');
        if (!modal) {
            console.error('Build editor modal not found!');
            return;
        }
        
        modal.classList.remove('hidden');

        // Populate build name
        const nameInput = document.getElementById('build-name-input');
        if (nameInput) {
            nameInput.value = build.name;
        }

        // Check if editor data is already loaded
        const hasCustomDropdowns = modal.querySelectorAll('.custom-select-dropdown').length > 0;
        const hasOptions = modal.querySelectorAll('select option').length > modal.querySelectorAll('select').length; // More than just default options
        
        if (hasCustomDropdowns || hasOptions) {
            // Data already loaded, just populate the build
            console.log('Editor data already loaded, populating build...');
            setTimeout(() => {
                this.populateBuildEditor(build);
            }, 100);
        } else {
            // Load items data and populate selects first
            this.loadEditorData().then(() => {
                // Then populate current build data after selects are loaded
                setTimeout(() => {
                    this.populateBuildEditor(build);
                }, 200);
            }).catch(error => {
                console.error('Error in loadEditorData:', error);
                // Load fallback data and then populate
                this.loadFallbackData();
                setTimeout(() => {
                    this.populateBuildEditor(build);
                }, 200);
            });
        }
    }

    closeBuildEditor() {
        const modal = document.getElementById('build-editor-modal');
        modal.classList.add('hidden');
        this.currentEditingBuildId = null;
    }

    saveBuildFromEditor() {
        if (!this.currentEditingBuildId) return;

        const buildIndex = this.builds.findIndex(b => b.id === this.currentEditingBuildId);
        if (buildIndex === -1) return;

        // Get build name
        const buildName = document.getElementById('build-name-input').value.trim() || 'Unnamed Build';

        // Get equipment data
        const equipment = {};
        const equipmentSlots = ['helmet', 'mask', 'top', 'bottom', 'gloves', 'shoes'];
        
        equipmentSlots.forEach(slot => {
            const itemSelect = document.querySelector(`[data-slot="${slot}"] .item-select`);
            const modSelect = document.querySelector(`[data-slot="${slot}"] .mod-select`);
            
            equipment[slot] = {
                item: itemSelect.value || null,
                mod: modSelect.value || null
            };
        });

        // Get weapons data
        const weapons = {};
        const weaponSlots = ['weapon1', 'weapon2', 'weapon3'];
        
        weaponSlots.forEach(slot => {
            const itemSelect = document.querySelector(`[data-slot="${slot}"] .item-select`);
            const modSelect = document.querySelector(`[data-slot="${slot}"] .mod-select`);
            
            weapons[slot] = {
                item: itemSelect.value || null,
                mod: modSelect.value || null
            };
        });

        // Update build
        this.builds[buildIndex] = {
            ...this.builds[buildIndex],
            name: buildName,
            equipment: equipment,
            weapons: weapons,
            modified: new Date().toISOString()
        };

        // Save and refresh
        this.saveBuilds();
        this.displayBuilds();
        this.closeBuildEditor();
        this.showNotification('Build saved successfully!', 'success');
    }

    populateBuildEditor(build) {
        console.log('Populating build editor with data:', build);
        
        // Populate equipment slots
        Object.keys(build.equipment).forEach(slot => {
            const slotData = build.equipment[slot];
            const slotElement = document.querySelector(`[data-slot="${slot}"]`);
            
            console.log(`Processing equipment slot: ${slot}`, slotData);
            
            if (slotElement) {
                const itemSelect = slotElement.querySelector('.item-select');
                const modSelect = slotElement.querySelector('.mod-select');
                
                if (itemSelect) {
                    if (slotData.item) {
                        itemSelect.value = slotData.item;
                        console.log(`Set ${slot} item to:`, slotData.item);
                    }
                } else {
                    console.warn(`Item select not found for slot: ${slot}`);
                }
                
                if (modSelect) {
                    if (slotData.mod) {
                        modSelect.value = slotData.mod;
                        console.log(`Set ${slot} mod to:`, slotData.mod);
                    }
                } else {
                    console.warn(`Mod select not found for slot: ${slot}`);
                }
            } else {
                console.warn(`Slot element not found for: ${slot}`);
            }
        });

        // Populate weapon slots
        Object.keys(build.weapons).forEach(slot => {
            const slotData = build.weapons[slot];
            const slotElement = document.querySelector(`[data-slot="${slot}"]`);
            
            console.log(`Processing weapon slot: ${slot}`, slotData);
            
            if (slotElement) {
                const itemSelect = slotElement.querySelector('.item-select');
                const modSelect = slotElement.querySelector('.mod-select');
                
                if (itemSelect) {
                    if (slotData.item) {
                        itemSelect.value = slotData.item;
                        console.log(`Set ${slot} weapon to:`, slotData.item);
                    }
                } else {
                    console.warn(`Weapon select not found for slot: ${slot}`);
                }
                
                if (modSelect) {
                    if (slotData.mod) {
                        modSelect.value = slotData.mod;
                        console.log(`Set ${slot} weapon mod to:`, slotData.mod);
                    }
                } else {
                    console.warn(`Weapon mod select not found for slot: ${slot}`);
                }
            } else {
                console.warn(`Weapon slot element not found for: ${slot}`);
            }
        });
        
        console.log('Finished populating build editor');
    }

    async loadEditorData() {
        try {
            // Try to load data from JSON files (works when served via HTTP)
            const [weaponsData, armorData, modsData] = await Promise.all([
                fetch('data/weapons.json').then(r => {
                    if (!r.ok) throw new Error('Failed to load weapons');
                    return r.json();
                }),
                fetch('data/armor.json').then(r => {
                    if (!r.ok) throw new Error('Failed to load armor');
                    return r.json();
                }),
                fetch('data/mods.json').then(r => {
                    if (!r.ok) throw new Error('Failed to load mods');
                    return r.json();
                })
            ]);

            // Store data for later use
            this.gameData = {
                weapons: weaponsData.weapons,
                armor: armorData.armor || [],
                mods: modsData
            };

            // Populate equipment selects - use armor array and filter by geartype
            const equipmentTypes = ['helmet', 'mask', 'top', 'bottom', 'gloves', 'shoes'];
            equipmentTypes.forEach(type => {
                const itemSelect = document.querySelector(`[data-type="${type}"]`);
                if (itemSelect) {
                    itemSelect.innerHTML = `<option value="">Select ${type.charAt(0).toUpperCase() + type.slice(1)}</option>`;
                    
                    // Filter armor by geartype
                    const armorItems = this.gameData.armor.filter(item => 
                        item.geartype && item.geartype.toLowerCase() === type.toLowerCase()
                    );
                    
                    armorItems.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.name;
                        option.textContent = item.name;
                        option.setAttribute('data-img', item.img || '');
                        option.setAttribute('data-gearset', item.gearset || '');
                        itemSelect.appendChild(option);
                    });
                    
                    // Convert to custom select with images
                    this.enhanceSelectWithImages(itemSelect);
                }
            });

            // Populate weapon selects
            const weaponSelects = document.querySelectorAll('[data-type="weapon"]');
            weaponSelects.forEach(select => {
                select.innerHTML = '<option value="">Select Weapon</option>';
                weaponsData.weapons.forEach(weapon => {
                    const option = document.createElement('option');
                    option.value = weapon.name;
                    option.textContent = weapon.name;
                    option.setAttribute('data-img', weapon.img || '');
                    option.setAttribute('data-type-info', weapon.type || '');
                    select.appendChild(option);
                });
                
                // Convert to custom select with images
                this.enhanceSelectWithImages(select);
            });

            // Populate mod selects with filtered mods based on geartype
            const allMods = [...(modsData.weapon_mods || []), ...(modsData.armor_mods || [])];
            const modSelects = document.querySelectorAll('.mod-select');
            modSelects.forEach(select => {
                select.innerHTML = '<option value="">Select Mod</option>';
                
                // Get the geartype from data-type attribute (e.g., "helmet-mod" -> "helmet")
                const dataType = select.dataset.type || '';
                const gearType = dataType.replace('-mod', ''); // Remove "-mod" suffix
                
                console.log(`Populating mod select for geartype: ${gearType}`);
                
                // Filter mods based on geartype
                const filteredMods = allMods.filter(mod => {
                    const modFor = mod.mod_for || '';
                    
                    // Check if mod is for "all" geartypes
                    if (modFor.toLowerCase() === 'all') {
                        return true;
                    }
                    
                    // Check if mod is for weapons
                    if (gearType === 'weapon' && modFor.toLowerCase() === 'weapon') {
                        return true;
                    }
                    
                    // Check if mod is for specific armor piece
                    // Convert geartype to match mod_for format (helmet -> Helmet, mask -> Masks, etc.)
                    const expectedModFor = this.convertGearTypeToModFor(gearType);
                    return modFor === expectedModFor;
                });
                
                console.log(`Found ${filteredMods.length} compatible mods for ${gearType}:`, filteredMods.map(m => m.mod_name));
                
                filteredMods.forEach(mod => {
                    const modName = mod.mod_name || mod.name || 'Unknown Mod';
                    const option = document.createElement('option');
                    option.value = modName;
                    option.textContent = modName;
                    option.setAttribute('data-img', mod.img || '');
                    option.setAttribute('data-mod-for', mod.mod_for || '');
                    select.appendChild(option);
                });
                
                // Convert to custom select with images
                this.enhanceSelectWithImages(select);
            });

        } catch (error) {
            console.warn('Cannot load JSON files (likely CORS issue when running locally):', error);
            console.log('Using fallback data instead...');
            this.loadFallbackData();
        }
    }

    loadFallbackData() {
        console.log('Loading fallback data for local testing...');
        
        // Enhanced fallback data in case JSON files can't be loaded
        const sampleData = {
            helmets: [
                'Combat Helmet', 'Tactical Helmet', 'Sniper Hood', 'Gas Mask Helmet',
                'Riot Helmet', 'Ballistic Helmet', 'Night Vision Helmet'
            ],
            masks: [
                'Gas Mask', 'Tactical Mask', 'Respirator', 'Face Shield',
                'Combat Mask', 'Stealth Mask', 'Radiation Mask'
            ],
            tops: [
                'Tactical Vest', 'Combat Armor', 'Ghillie Suit', 'Field Jacket',
                'Plate Carrier', 'Stealth Suit', 'Riot Armor'
            ],
            bottoms: [
                'Combat Pants', 'Tactical Trousers', 'Camo Pants', 'Field Pants', 
                'Cargo Pants', 'Stealth Pants', 'Armor Pants'
            ],
            gloves: [
                'Tactical Gloves', 'Combat Gloves', 'Precision Gloves', 'Field Gloves',
                'Armored Gloves', 'Stealth Gloves', 'Marksman Gloves'
            ],
            shoes: [
                'Combat Boots', 'Tactical Boots', 'Stealth Boots', 'Field Boots',
                'Assault Boots', 'Sniper Boots', 'All-Terrain Boots'
            ],
            weapons: [
                { id: 1, name: 'AR-15', type: 'weapon', damage_type: 'physical', keyword_type: 'Assault, Auto' },
                { id: 2, name: 'AK-47', type: 'weapon', damage_type: 'physical', keyword_type: 'Assault, Auto' },
                { id: 3, name: 'Sniper Rifle', type: 'weapon', damage_type: 'physical', keyword_type: 'Sniper, Precision' },
                { id: 4, name: 'Shotgun', type: 'weapon', damage_type: 'physical', keyword_type: 'Shotgun, Close' },
                { id: 5, name: 'SMG', type: 'weapon', damage_type: 'physical', keyword_type: 'SMG, Auto' },
                { id: 6, name: 'Pistol', type: 'weapon', damage_type: 'physical', keyword_type: 'Pistol, Semi' }
            ],
            mods: [
                // Weapon mods
                { mod_name: 'Red Dot Sight', mod_for: 'Weapon' },
                { mod_name: '8x Scope', mod_for: 'Weapon' },
                { mod_name: '12x Scope', mod_for: 'Weapon' },
                { mod_name: 'Silencer', mod_for: 'Weapon' },
                { mod_name: 'Extended Magazine', mod_for: 'Weapon' },
                { mod_name: 'Foregrip', mod_for: 'Weapon' },
                { mod_name: 'Compensator', mod_for: 'Weapon' },
                { mod_name: 'Laser Sight', mod_for: 'Weapon' },
                { mod_name: 'Flashlight', mod_for: 'Weapon' },
                { mod_name: 'Bipod', mod_for: 'Weapon' },
                
                // Helmet mods\n                { mod_name: 'Night Vision', mod_for: 'Helmet' },
                { mod_name: 'Communication System', mod_for: 'Helmet' },
                
                // Mask mods
                { mod_name: 'Air Filter', mod_for: 'Masks' },
                { mod_name: 'Gas Protection', mod_for: 'Masks' },
                
                // Chest/Top mods
                { mod_name: 'Armor Plating', mod_for: 'Chest' },
                { mod_name: 'Extra Pockets', mod_for: 'Chest' },
                
                // Legs/Bottom mods
                { mod_name: 'Knee Pads', mod_for: 'Legs' },
                { mod_name: 'Movement Enhancement', mod_for: 'Legs' },
                
                // Gloves mods
                { mod_name: 'Grip Enhancement', mod_for: 'Gloves' },
                { mod_name: 'Dexterity Boost', mod_for: 'Gloves' },
                
                // Boots/Shoes mods
                { mod_name: 'Silent Step', mod_for: 'Boots' },
                { mod_name: 'Speed Boost', mod_for: 'Boots' },
                
                // Universal mods (for all gear types)
                { mod_name: 'Durability Boost', mod_for: 'all' },
                { mod_name: 'Stealth Enhancement', mod_for: 'all' },
                { mod_name: 'Quick Reload', mod_for: 'all' }
            ]
        };

        // Populate with fallback data
        const equipmentTypes = ['helmet', 'mask', 'top', 'bottom', 'gloves', 'shoes'];
        equipmentTypes.forEach(type => {
            const itemSelect = document.querySelector(`[data-type="${type}"]`);
            if (itemSelect && sampleData[type + 's']) {
                itemSelect.innerHTML = `<option value="">Select ${type.charAt(0).toUpperCase() + type.slice(1)}</option>`;
                sampleData[type + 's'].forEach(item => {
                    const option = document.createElement('option');
                    option.value = item;
                    option.textContent = item;
                    option.setAttribute('data-img', ''); // No images in fallback data
                    itemSelect.appendChild(option);
                });
                
                // Convert to custom select with images
                this.enhanceSelectWithImages(itemSelect);
            }
        });

        // Populate weapon selects
        const weaponSelects = document.querySelectorAll('[data-type="weapon"]');
        weaponSelects.forEach(select => {
            select.innerHTML = '<option value="">Select Weapon</option>';
            sampleData.weapons.forEach(weapon => {
                // Handle both old string format and new object format
                const weaponName = typeof weapon === 'string' ? weapon : weapon.name;
                const option = document.createElement('option');
                option.value = weaponName;
                option.textContent = weaponName;
                option.setAttribute('data-img', (typeof weapon === 'object' ? weapon.img : '') || '');
                select.appendChild(option);
            });
            
            // Convert to custom select with images
            this.enhanceSelectWithImages(select);
        });

        // Populate mod selects with filtered mods (fallback version)
        const modSelects = document.querySelectorAll('.mod-select');
        modSelects.forEach(select => {
            select.innerHTML = '<option value="">Select Mod</option>';
            
            // Get the geartype from data-type attribute
            const dataType = select.dataset.type || '';
            const gearType = dataType.replace('-mod', '');
            
            // Filter mods based on geartype
            const filteredMods = sampleData.mods.filter(mod => {
                const modFor = mod.mod_for || '';
                
                if (modFor.toLowerCase() === 'all') return true;
                if (gearType === 'weapon' && modFor.toLowerCase() === 'weapon') return true;
                
                const expectedModFor = this.convertGearTypeToModFor(gearType);
                return modFor === expectedModFor;
            });
            
            filteredMods.forEach(mod => {
                const modName = mod.mod_name || mod;
                const option = document.createElement('option');
                option.value = modName;
                option.textContent = modName;
                option.setAttribute('data-img', ''); // No images in fallback data
                option.setAttribute('data-mod-for', mod.mod_for || '');
                select.appendChild(option);
            });
            
            // Convert to custom select with images
            this.enhanceSelectWithImages(select);
        });

        this.showNotification('Loaded fallback data (JSON files not available)', 'info');
    }
    
    // Helper function to convert geartype to mod_for format
    convertGearTypeToModFor(gearType) {
        const mapping = {
            'helmet': 'Helmet',
            'mask': 'Masks', // Note: plural in data
            'top': 'Chest',
            'bottom': 'Legs',
            'gloves': 'Gloves',
            'shoes': 'Boots',
            'weapon': 'Weapon'
        };
        return mapping[gearType.toLowerCase()] || gearType;
    }

    setupEditorChangeListeners() {
        // This function will be called after DOM is ready
        // We'll set it up in a timeout to ensure elements exist
        setTimeout(() => {
            const allSelects = document.querySelectorAll('.item-select, .mod-select');
            allSelects.forEach(select => {
                select.addEventListener('change', () => {
                    // Auto-save functionality can be added here
                    console.log('Selection changed:', select.value);
                });
            });
        }, 100);
    }

    deleteBuild(buildId) {
        if (confirm('Are you sure you want to delete this build?')) {
            this.builds = this.builds.filter(b => b.id !== buildId);
            this.saveBuilds();
            this.displayBuilds();
            this.showNotification('Build deleted successfully!', 'success');
        }
    }

    // Data loading functions for other sections
    async loadWeapons() {
        const cardContainer = document.getElementById('weapons-card-content');
        const tableContainer = document.getElementById('weapons-table-content');
        
        if (cardContainer) {
            cardContainer.innerHTML = '<p class="loading">Loading weapons data...</p>';
        }
        
        try {
            const response = await fetch('data/weapons.json');
            const data = await response.json();
            
            // Store weapons data for table functionality
            this.weaponsData = data.weapons;
            
            // Load card view
            if (cardContainer) {
                cardContainer.innerHTML = '';
                data.weapons.forEach(weapon => {
                    const weaponCard = this.createItemCard(weapon, 'weapon');
                    cardContainer.appendChild(weaponCard);
                });
            }
            
            // Load table view
            this.loadWeaponsTable(data.weapons);
            
            // Setup view switching
            this.setupWeaponsViewSwitching();
            
        } catch (error) {
            console.error('Error loading weapons:', error);
            if (cardContainer) {
                cardContainer.innerHTML = '<p class="error">Error loading weapons data.</p>';
            }
            // Use fallback data for table
            this.loadWeaponsTable(this.getFallbackWeapons());
        }
    }

    setupWeaponsViewSwitching() {
        const cardViewBtn = document.getElementById('weapons-card-view');
        const tableViewBtn = document.getElementById('weapons-table-view');
        const cardContent = document.getElementById('weapons-card-content');
        const tableContent = document.getElementById('weapons-table-content');
        
        if (!cardViewBtn || !tableViewBtn) return;
        
        cardViewBtn.addEventListener('click', () => {
            cardViewBtn.classList.add('active');
            tableViewBtn.classList.remove('active');
            cardContent.classList.remove('hidden');
            tableContent.classList.add('hidden');
        });
        
        tableViewBtn.addEventListener('click', () => {
            tableViewBtn.classList.add('active');
            cardViewBtn.classList.remove('active');
            tableContent.classList.remove('hidden');
            cardContent.classList.add('hidden');
        });
    }

    loadWeaponsTable(weapons) {
        const tableBody = document.getElementById('weapons-table-body');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        weapons.forEach(weapon => {
            const row = this.createWeaponTableRow(weapon);
            tableBody.appendChild(row);
        });
        
        // Setup table functionality
        this.setupTableSorting();
        this.setupTableSearch();
        this.setupTableFilters();
        
        // Set initial language filter selection
        const languageFilter = document.getElementById('language-filter');
        if (languageFilter) {
            languageFilter.value = this.currentTableLanguage;
        }
    }

    createWeaponTableRow(weapon) {
        const row = document.createElement('tr');
        
        // Image cell
        const imageCell = document.createElement('td');
        if (weapon.img) {
            imageCell.innerHTML = `<img src="${weapon.img}" alt="${weapon.name}" class="table-image" onerror="this.style.display='none'">`;
        } else {
            imageCell.innerHTML = '<div class="no-image-placeholder">No Image</div>';
        }
        
        // Name cell
        const nameCell = document.createElement('td');
        nameCell.innerHTML = `<div class="table-name">${weapon.name || 'Unknown'}</div>`;
        
        // Type cell
        const typeCell = document.createElement('td');
        typeCell.textContent = weapon.type || 'N/A';
        
        // Damage type cell
        const damageTypeCell = document.createElement('td');
        damageTypeCell.textContent = weapon.damage_type || 'N/A';
        
        // Keywords cell
        const keywordsCell = document.createElement('td');
        if (weapon.keyword_type) {
            const keywords = weapon.keyword_type.split(',').map(k => k.trim());
            const keywordBadges = keywords.map(keyword => 
                `<span class="table-keyword-badge">${keyword}</span>`
            ).join('');
            keywordsCell.innerHTML = `<div class="table-keywords">${keywordBadges}</div>`;
        } else {
            keywordsCell.textContent = 'N/A';
        }
        
        // Description cell - support both languages
        const descCell = document.createElement('td');
        const currentLang = this.currentTableLanguage || 'en';
        const description = currentLang === 'th' ? (weapon.desc_th || weapon.desc_en) : weapon.desc_en;
        
        if (description) {
            const truncatedDesc = description.length > 100 ? description.substring(0, 100) + '...' : description;
            descCell.innerHTML = `<div class="table-description" data-lang="${currentLang}" data-full-desc="${description.replace(/"/g, '&quot;')}" onclick="app.toggleDescription(this)">${truncatedDesc.replace(/\n/g, '<br>')}</div>`;
        } else {
            descCell.innerHTML = `<div class="table-description" data-lang="${currentLang}">No description available</div>`;
        }
        
        // Store data for sorting and language switching
        row.dataset.name = weapon.name || '';
        row.dataset.type = weapon.type || '';
        row.dataset.damageType = weapon.damage_type || '';
        row.dataset.keywords = weapon.keyword_type || '';
        row.dataset.descEn = weapon.desc_en || '';
        row.dataset.descTh = weapon.desc_th || weapon.desc_en || '';
        
        row.appendChild(imageCell);
        row.appendChild(nameCell);
        row.appendChild(typeCell);
        row.appendChild(damageTypeCell);
        row.appendChild(keywordsCell);
        row.appendChild(descCell);
        
        return row;
    }

    setupTableSorting() {
        const headers = document.querySelectorAll('#weapons-table th.sortable');
        
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.dataset.column;
                const currentSort = header.classList.contains('sort-asc') ? 'asc' : 
                                 header.classList.contains('sort-desc') ? 'desc' : 'none';
                
                // Remove sort classes from all headers
                headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
                
                // Apply new sort
                let newSort = 'asc';
                if (currentSort === 'asc') newSort = 'desc';
                else if (currentSort === 'desc') newSort = 'asc';
                
                header.classList.add(`sort-${newSort}`);
                this.sortTable(column, newSort);
            });
        });
    }

    sortTable(column, direction) {
        const tableBody = document.getElementById('weapons-table-body');
        const rows = Array.from(tableBody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            let aVal = '';
            let bVal = '';
            
            switch (column) {
                case 'name':
                    aVal = a.dataset.name;
                    bVal = b.dataset.name;
                    break;
                case 'type':
                    aVal = a.dataset.type;
                    bVal = b.dataset.type;
                    break;
                case 'damage_type':
                    aVal = a.dataset.damageType;
                    bVal = b.dataset.damageType;
                    break;
                case 'keyword_type':
                    aVal = a.dataset.keywords;
                    bVal = b.dataset.keywords;
                    break;
                default:
                    return 0;
            }
            
            if (direction === 'asc') {
                return aVal.localeCompare(bVal);
            } else {
                return bVal.localeCompare(aVal);
            }
        });
        
        // Clear and re-append sorted rows
        tableBody.innerHTML = '';
        rows.forEach(row => tableBody.appendChild(row));
    }

    setupTableSearch() {
        const searchInput = document.getElementById('weapons-table-search');
        const clearBtn = document.getElementById('weapons-search-clear');
        
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            this.filterTable(e.target.value);
        });
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                this.filterTable('');
            });
        }
    }

    setupTableFilters() {
        const damageTypeFilter = document.getElementById('damage-type-filter');
        const languageFilter = document.getElementById('language-filter');
        
        if (damageTypeFilter) {
            damageTypeFilter.addEventListener('change', (e) => {
                this.filterTableByDamageType(e.target.value);
            });
        }
        
        if (languageFilter) {
            languageFilter.addEventListener('change', (e) => {
                this.switchTableLanguage(e.target.value);
            });
        }
    }

    filterTable(searchTerm) {
        const tableBody = document.getElementById('weapons-table-body');
        const rows = tableBody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const matches = text.includes(searchTerm.toLowerCase());
            row.style.display = matches ? '' : 'none';
        });
    }

    filterTableByDamageType(damageType) {
        const tableBody = document.getElementById('weapons-table-body');
        const rows = tableBody.querySelectorAll('tr');
        
        rows.forEach(row => {
            if (!damageType) {  
                row.style.display = '';
            } else {
                const matches = row.dataset.damageType === damageType;
                row.style.display = matches ? '' : 'none';
            }
        });
    }

    switchTableLanguage(language) {
        this.currentTableLanguage = language;
        const tableBody = document.getElementById('weapons-table-body');
        const rows = tableBody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const descCell = row.querySelector('.table-description');
            if (descCell) {
                const description = language === 'th' ? row.dataset.descTh : row.dataset.descEn;
                if (description) {
                    const truncatedDesc = description.length > 100 ? description.substring(0, 100) + '...' : description;
                    descCell.innerHTML = truncatedDesc.replace(/\n/g, '<br>');
                    descCell.setAttribute('data-full-desc', description.replace(/"/g, '&quot;'));
                    descCell.classList.remove('expanded');
                } else {
                    descCell.innerHTML = 'No description available';
                }
                descCell.setAttribute('data-lang', language);
            }
        });
        
        // Save language preference
        localStorage.setItem('weaponsTableLanguage', language);
        
        console.log(`Table language switched to: ${language}`);
    }

    getFallbackWeapons() {
        // Return fallback weapons data for table
        return [
            { id: 1, name: 'AR-15', type: 'weapon', damage_type: 'physical', keyword_type: 'Assault, Auto', desc_en: 'Standard assault rifle' },
            { id: 2, name: 'AK-47', type: 'weapon', damage_type: 'physical', keyword_type: 'Assault, Auto', desc_en: 'Reliable assault rifle' },
            { id: 3, name: 'Sniper Rifle', type: 'weapon', damage_type: 'physical', keyword_type: 'Sniper, Precision', desc_en: 'Long range precision weapon' }
        ];
    }

    async loadMods() {
        const cardContainer = document.getElementById('mods-card-content');
        const tableContainer = document.getElementById('mods-table-content');
        
        if (cardContainer) {
            cardContainer.innerHTML = '<p class="loading">Loading mods data...</p>';
        }
        
        try {
            const response = await fetch('data/mods.json');
            const data = await response.json();
            
            // Combine all mods into one array with type indicator
            const allMods = [
                ...data.weapon_mods.map(mod => ({...mod, mod_type: 'weapon-mod'})),
                ...data.armor_mods.map(mod => ({...mod, mod_type: 'armor-mod'}))
            ];
            
            // Store mods data for table functionality
            this.modsData = allMods;
            
            // Load card view
            if (cardContainer) {
                cardContainer.innerHTML = '';
                
                // Create sections for weapon mods and armor mods
                const weaponModsSection = document.createElement('div');
                weaponModsSection.innerHTML = '<h3>🔫 Weapon Mods</h3>';
                const weaponModsGrid = document.createElement('div');
                weaponModsGrid.className = 'items-grid';
                
                data.weapon_mods.forEach(mod => {
                    const modCard = this.createModCard(mod, 'weapon-mod');
                    weaponModsGrid.appendChild(modCard);
                });
                
                weaponModsSection.appendChild(weaponModsGrid);
                cardContainer.appendChild(weaponModsSection);
                
                const armorModsSection = document.createElement('div');
                armorModsSection.innerHTML = '<h3>🛡️ Armor Mods</h3>';
                const armorModsGrid = document.createElement('div');
                armorModsGrid.className = 'items-grid';
                
                data.armor_mods.forEach(mod => {
                    const modCard = this.createModCard(mod, 'armor-mod');
                    armorModsGrid.appendChild(modCard);
                });
                
                armorModsSection.appendChild(armorModsGrid);
                cardContainer.appendChild(armorModsSection);
            }
            
            // Load table view
            this.loadModsTable(allMods);
            
            // Setup view switching
            this.setupModsViewSwitching();
            
        } catch (error) {
            console.error('Error loading mods:', error);
            if (cardContainer) {
                cardContainer.innerHTML = '<p class="error">Error loading mods data.</p>';
            }
            // Use fallback data for table
            this.loadModsTable(this.getFallbackMods());
        }
    }

    async loadArmor() {
        const cardContainer = document.getElementById('armor-card-content');
        const tableContainer = document.getElementById('armor-table-content');
        
        if (cardContainer) {
            cardContainer.innerHTML = '<p class="loading">Loading armor data...</p>';
        }
        
        try {
            const response = await fetch('data/armor.json');
            const data = await response.json();
            
            // Store armor data for table functionality
            this.armorData = data.armor || [];
            
            // Load card view
            if (cardContainer) {
                cardContainer.innerHTML = '';
                this.armorData.forEach(armor => {
                    const armorCard = this.createArmorCard(armor);
                    cardContainer.appendChild(armorCard);
                });
            }
            
            // Load table view
            this.loadArmorTable(this.armorData);
            
            // Setup view switching
            this.setupArmorViewSwitching();
            
        } catch (error) {
            console.error('Error loading armor:', error);
            if (cardContainer) {
                cardContainer.innerHTML = '<p class="error">Error loading armor data.</p>';
            }
            // Use fallback data for table
            this.loadArmorTable(this.getFallbackArmor());
        }
    }

    async loadAnimals() {
        const container = document.getElementById('animals-content');
        container.innerHTML = '<p class="loading">Loading animals data...</p>';
        
        try {
            const response = await fetch('data/animals.json');
            const data = await response.json();
            
            container.innerHTML = '';
            data.animals.forEach(animal => {
                const animalCard = this.createItemCard(animal, 'animal');
                container.appendChild(animalCard);
            });
        } catch (error) {
            console.error('Error loading animals:', error);
            container.innerHTML = '<p class="error">Error loading animals data.</p>';
        }
    }

    async loadFood() {
        const container = document.getElementById('food-content');
        container.innerHTML = '<p class="loading">Loading food data...</p>';
        
        try {
            const response = await fetch('data/food.json');
            const data = await response.json();
            
            container.innerHTML = '';
            data.food.forEach(food => {
                const foodCard = this.createItemCard(food, 'food');
                container.appendChild(foodCard);
            });
        } catch (error) {
            console.error('Error loading food:', error);
            container.innerHTML = '<p class="error">Error loading food data.</p>';
        }
    }

    createItemCard(item, type) {
        const card = document.createElement('div');
        card.className = 'item-card';
        
        let cardContent = '';
        
        switch (type) {
            case 'weapon':
                // Handle new weapon structure from Once Human
                const keywordBadges = item.keyword_type ? 
                    item.keyword_type.split(',').map(keyword => 
                        `<span class="keyword-badge">${keyword.trim()}</span>`
                    ).join('') : '';
                
                cardContent = `
                    <div class="item-header">
                        <div class="item-title-section">
                            <h3>${item.name}</h3>
                            ${keywordBadges ? `<div class="keyword-tags">${keywordBadges}</div>` : ''}
                        </div>
                        ${item.img ? `<div class="item-image"><img src="${item.img}" alt="${item.name}" onerror="this.style.display='none'"></div>` : ''}
                    </div>
                    <div class="item-details">
                        <p><strong>Type:</strong> ${item.type}</p>
                        <p><strong>Damage Type:</strong> ${item.damage_type || 'N/A'}</p>
                        ${item.desc_en ? `
                            <div class="item-description">
                                <strong>Description:</strong>
                                <div class="desc-content">${item.desc_en.replace(/\n/g, '<br>')}</div>
                            </div>
                        ` : ''}
                    </div>
                `;
                break;
                
            case 'armor':
                cardContent = `
                    <div class="item-header">
                        <h3>${item.name}</h3>
                        <span class="rarity ${item.rarity.toLowerCase()}">${item.rarity}</span>
                    </div>
                    <div class="item-details">
                        <p><strong>Type:</strong> ${item.type}</p>
                        <p><strong>Defense:</strong> ${item.defense}</p>
                        <p><strong>Compatible Mods:</strong> ${item.compatible_mods.length}</p>
                    </div>
                `;
                break;
                
            case 'weapon-mod':
            case 'armor-mod':
                cardContent = `
                    <div class="item-header">
                        <h3>${item.name}</h3>
                        <span class="mod-type">${item.type}</span>
                    </div>
                    <div class="item-details">
                        <p><strong>Effect:</strong> ${item.effect}</p>
                        <p><strong>Compatible:</strong> ${item.compatible_weapons ? 'Weapons' : 'Armor'}</p>
                    </div>
                `;
                break;
                
            case 'animal':
                cardContent = `
                    <div class="item-header">
                        <h3>${item.name}</h3>
                        <span class="rarity ${item.rarity.toLowerCase()}">${item.rarity}</span>
                    </div>
                    <div class="item-details">
                        <p><strong>Type:</strong> ${item.type}</p>
                        <p><strong>Health:</strong> ${item.health}</p>
                        <p><strong>Damage:</strong> ${item.damage}</p>
                        <p><strong>Location:</strong> ${item.location.join(', ')}</p>
                        <p><strong>Drops:</strong> ${item.drops.join(', ')}</p>
                        <p><strong>Behavior:</strong> ${item.behavior}</p>
                    </div>
                `;
                break;
                
            case 'food':
                cardContent = `
                    <div class="item-header">
                        <h3>${item.name}</h3>
                        <span class="rarity ${item.rarity.toLowerCase()}">${item.rarity}</span>
                    </div>
                    <div class="item-details">
                        <p><strong>Type:</strong> ${item.type}</p>
                        <p><strong>Hunger:</strong> +${item.hunger_restore}</p>
                        <p><strong>Health:</strong> ${item.health_restore >= 0 ? '+' : ''}${item.health_restore}</p>
                        <p><strong>Spoilage:</strong> ${item.spoilage_time}</p>
                        ${item.effects.length > 0 ? `<p><strong>Effects:</strong> ${item.effects.join(', ')}</p>` : ''}
                        ${item.ingredients.length > 0 ? `<p><strong>Ingredients:</strong> ${item.ingredients.join(', ')}</p>` : ''}
                    </div>
                `;
                break;
        }
        
        card.innerHTML = cardContent;
        return card;
    }

    createModCard(mod, type) {
        const card = document.createElement('div');
        card.className = 'item-card';
        
        const cardContent = `
            <div class="item-header">
                <div class="item-title-section">
                    <h3>${mod.mod_name}</h3>
                </div>
                ${mod.img ? `<div class="item-image"><img src="${mod.img}" alt="${mod.mod_name}" onerror="this.style.display='none'"></div>` : ''}
            </div>
            <div class="item-details">
                <p><strong>Type:</strong> ${type === 'weapon-mod' ? '🔫 Weapon Mod' : '🛡️ Armor Mod'}</p>
                <p><strong>For:</strong> ${mod.mod_for}</p>
                <p><strong>Contents:</strong> ${mod.contents}</p>
                ${mod.mod_des_en ? `
                    <div class="item-description">
                        <strong>Description:</strong>
                        <div class="desc-content">${mod.mod_des_en}</div>
                    </div>
                ` : ''}
            </div>
        `;
        
        card.innerHTML = cardContent;
        return card;
    }

    setupModsViewSwitching() {
        const cardViewBtn = document.getElementById('mods-card-view');
        const tableViewBtn = document.getElementById('mods-table-view');
        const cardContent = document.getElementById('mods-card-content');
        const tableContent = document.getElementById('mods-table-content');
        
        if (!cardViewBtn || !tableViewBtn) return;
        
        cardViewBtn.addEventListener('click', () => {
            cardViewBtn.classList.add('active');
            tableViewBtn.classList.remove('active');
            cardContent.classList.remove('hidden');
            tableContent.classList.add('hidden');
        });
        
        tableViewBtn.addEventListener('click', () => {
            tableViewBtn.classList.add('active');
            cardViewBtn.classList.remove('active');
            tableContent.classList.remove('hidden');
            cardContent.classList.add('hidden');
        });
    }

    loadModsTable(mods) {
        const tableBody = document.getElementById('mods-table-body');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        mods.forEach(mod => {
            const row = this.createModTableRow(mod);
            tableBody.appendChild(row);
        });
        
        // Setup table functionality
        this.setupModsTableSorting();
        this.setupModsTableSearch();
        this.setupModsTableFilters();
        
        // Set initial language filter selection
        const languageFilter = document.getElementById('mods-language-filter');
        if (languageFilter) {
            languageFilter.value = this.currentTableLanguage || 'en';
        }
    }

    createModTableRow(mod) {
        const row = document.createElement('tr');
        
        // Image cell
        const imageCell = document.createElement('td');
        if (mod.img) {
            imageCell.innerHTML = `<img src="${mod.img}" alt="${mod.mod_name}" class="table-image" onerror="this.style.display='none'">`;
        } else {
            imageCell.innerHTML = '<div class="no-image-placeholder">No Image</div>';
        }
        
        // Name cell
        const nameCell = document.createElement('td');
        nameCell.innerHTML = `<div class="table-name">${mod.mod_name || 'Unknown'}</div>`;
        
        // Type cell
        const typeCell = document.createElement('td');
        typeCell.textContent = mod.mod_type === 'weapon-mod' ? 'Weapon Mod' : 'Armor Mod';
        
        // For cell
        const forCell = document.createElement('td');
        forCell.textContent = mod.mod_for || 'N/A';
        
        // Contents cell
        const contentsCell = document.createElement('td');
        contentsCell.textContent = mod.contents || 'N/A';
        
        // Description cell - support both languages
        const descCell = document.createElement('td');
        const currentLang = this.currentTableLanguage || 'en';
        const description = currentLang === 'th' ? (mod.mod_des_th || mod.mod_des_en) : mod.mod_des_en;
        
        if (description) {
            const truncatedDesc = description.length > 100 ? description.substring(0, 100) + '...' : description;
            descCell.innerHTML = `<div class="table-description" data-lang="${currentLang}" data-full-desc="${description.replace(/"/g, '&quot;')}" onclick="app.toggleDescription(this)">${truncatedDesc}</div>`;
        } else {
            descCell.innerHTML = `<div class="table-description" data-lang="${currentLang}">No description available</div>`;
        }
        
        // Store data for sorting and language switching
        row.dataset.name = mod.mod_name || '';
        row.dataset.type = mod.mod_type || '';
        row.dataset.for = mod.mod_for || '';
        row.dataset.contents = mod.contents || '';
        row.dataset.descEn = mod.mod_des_en || '';
        row.dataset.descTh = mod.mod_des_th || mod.mod_des_en || '';
        
        row.appendChild(imageCell);
        row.appendChild(nameCell);
        row.appendChild(typeCell);
        row.appendChild(forCell);
        row.appendChild(contentsCell);
        row.appendChild(descCell);
        
        return row;
    }

    setupModsTableSorting() {
        const headers = document.querySelectorAll('#mods-table th.sortable');
        
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.dataset.column;
                const currentSort = header.classList.contains('sort-asc') ? 'asc' : 
                                 header.classList.contains('sort-desc') ? 'desc' : 'none';
                
                // Remove sort classes from all headers
                headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
                
                // Apply new sort
                let newSort = 'asc';
                if (currentSort === 'asc') newSort = 'desc';
                else if (currentSort === 'desc') newSort = 'asc';
                
                header.classList.add(`sort-${newSort}`);
                this.sortModsTable(column, newSort);
            });
        });
    }

    sortModsTable(column, direction) {
        const tableBody = document.getElementById('mods-table-body');
        const rows = Array.from(tableBody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            let aVal = '';
            let bVal = '';
            
            switch (column) {
                case 'name':
                    aVal = a.dataset.name;
                    bVal = b.dataset.name;
                    break;
                case 'type':
                    aVal = a.dataset.type;
                    bVal = b.dataset.type;
                    break;
                case 'for':
                    aVal = a.dataset.for;
                    bVal = b.dataset.for;
                    break;
                case 'contents':
                    aVal = a.dataset.contents;
                    bVal = b.dataset.contents;
                    break;
                default:
                    return 0;
            }
            
            if (direction === 'asc') {
                return aVal.localeCompare(bVal);
            } else {
                return bVal.localeCompare(aVal);
            }
        });
        
        // Clear and re-append sorted rows
        tableBody.innerHTML = '';
        rows.forEach(row => tableBody.appendChild(row));
    }

    setupModsTableSearch() {
        const searchInput = document.getElementById('mods-table-search');
        const clearBtn = document.getElementById('mods-search-clear');
        
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            this.filterModsTable(e.target.value);
        });
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                this.filterModsTable('');
            });
        }
    }

    setupModsTableFilters() {
        const modTypeFilter = document.getElementById('mod-type-filter');
        const languageFilter = document.getElementById('mods-language-filter');
        
        if (modTypeFilter) {
            modTypeFilter.addEventListener('change', (e) => {
                this.filterModsTableByType(e.target.value);
            });
        }
        
        if (languageFilter) {
            languageFilter.addEventListener('change', (e) => {
                this.switchModsTableLanguage(e.target.value);
            });
        }
    }

    filterModsTable(searchTerm) {
        const tableBody = document.getElementById('mods-table-body');
        const rows = tableBody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const matches = text.includes(searchTerm.toLowerCase());
            row.style.display = matches ? '' : 'none';
        });
    }

    filterModsTableByType(modType) {
        const tableBody = document.getElementById('mods-table-body');
        const rows = tableBody.querySelectorAll('tr');
        
        rows.forEach(row => {
            if (!modType) {  
                row.style.display = '';
            } else {
                const rowFor = row.dataset.for;
                const matches = modType === 'Weapon' ? 
                    rowFor === 'Weapon' : 
                    rowFor === 'Masks' || rowFor === 'Armor';
                row.style.display = matches ? '' : 'none';
            }
        });
    }

    switchModsTableLanguage(language) {
        const tableBody = document.getElementById('mods-table-body');
        const rows = tableBody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const descCell = row.querySelector('.table-description');
            if (descCell) {
                const description = language === 'th' ? row.dataset.descTh : row.dataset.descEn;
                descCell.innerHTML = description || 'No description available';
                descCell.setAttribute('data-lang', language);
            }
        });
        
        // Save language preference (same as weapons table)
        this.currentTableLanguage = language;
        localStorage.setItem('weaponsTableLanguage', language);
        
        console.log(`Mods table language switched to: ${language}`);
    }

    getFallbackMods() {
        // Return fallback mods data for table
        return [
            { 
                id: 1, 
                mod_name: 'Red Dot Sight', 
                mod_type: 'weapon-mod', 
                mod_for: 'Weapon', 
                contents: 'Common', 
                mod_des_en: 'Improved accuracy for medium range combat',
                mod_des_th: 'ปรับปรุงความแม่นยำสำหรับการต่อสู้ระยะกลาง'
            },
            { 
                id: 2, 
                mod_name: 'Armor Plating', 
                mod_type: 'armor-mod', 
                mod_for: 'Masks', 
                contents: 'Rare', 
                mod_des_en: 'Increases overall defense rating',
                mod_des_th: 'เพิ่มค่าป้องกันโดยรวม'
            }
        ];
    }

    // Armor functions
    setupArmorViewSwitching() {
        const cardViewBtn = document.getElementById('armor-card-view');
        const tableViewBtn = document.getElementById('armor-table-view');
        const cardContent = document.getElementById('armor-card-content');
        const tableContent = document.getElementById('armor-table-content');
        
        if (!cardViewBtn || !tableViewBtn) return;
        
        cardViewBtn.addEventListener('click', () => {
            cardViewBtn.classList.add('active');
            tableViewBtn.classList.remove('active');
            cardContent.classList.remove('hidden');
            tableContent.classList.add('hidden');
        });
        
        tableViewBtn.addEventListener('click', () => {
            tableViewBtn.classList.add('active');
            cardViewBtn.classList.remove('active');
            tableContent.classList.remove('hidden');
            cardContent.classList.add('hidden');
        });
    }

    loadArmorTable(armors) {
        const tableBody = document.getElementById('armor-table-body');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        armors.forEach(armor => {
            const row = this.createArmorTableRow(armor);
            tableBody.appendChild(row);
        });
        
        // Setup table functionality
        this.setupArmorTableSorting();
        this.setupArmorTableSearch();
        this.setupArmorTableFilters();
        
        // Set initial language filter selection
        const languageFilter = document.getElementById('armor-language-filter');
        if (languageFilter) {
            languageFilter.value = this.currentTableLanguage || 'en';
        }
    }

    createArmorTableRow(armor) {
        const row = document.createElement('tr');
        
        // Image cell
        const imageCell = document.createElement('td');
        if (armor.img) {
            imageCell.innerHTML = `<img src="${armor.img}" alt="${armor.name}" class="table-image" onerror="this.style.display='none'">`;
        } else {
            imageCell.innerHTML = '<div class="no-image-placeholder">No Image</div>';
        }
        
        // Name cell
        const nameCell = document.createElement('td');
        nameCell.innerHTML = `<div class="table-name">${armor.name || 'Unknown'}</div>`;
        
        // Gear Set cell
        const gearSetCell = document.createElement('td');
        gearSetCell.textContent = armor.gearset || 'N/A';
        
        // Gear Type cell
        const gearTypeCell = document.createElement('td');
        gearTypeCell.textContent = armor.geartype || 'N/A';
        
        // Type cell
        const typeCell = document.createElement('td');
        typeCell.textContent = armor.type || 'N/A';
        
        // Description cell - support both languages
        const descCell = document.createElement('td');
        const currentLang = this.currentTableLanguage || 'en';
        const description = currentLang === 'th' ? (armor.desc_th || armor.desc_en) : armor.desc_en;
        
        if (description) {
            const truncatedDesc = description.length > 100 ? description.substring(0, 100) + '...' : description;
            descCell.innerHTML = `<div class="table-description" data-lang="${currentLang}" data-full-desc="${description.replace(/"/g, '&quot;')}" onclick="app.toggleDescription(this)">${truncatedDesc.replace(/\n/g, '<br>')}</div>`;
        } else {
            descCell.innerHTML = `<div class="table-description" data-lang="${currentLang}">No description available</div>`;
        }
        
        // Store data for sorting and language switching
        row.dataset.name = armor.name || '';
        row.dataset.gearset = armor.gearset || '';
        row.dataset.geartype = armor.geartype || '';
        row.dataset.type = armor.type || '';
        row.dataset.descEn = armor.desc_en || '';
        row.dataset.descTh = armor.desc_th || armor.desc_en || '';
        
        row.appendChild(imageCell);
        row.appendChild(nameCell);
        row.appendChild(gearSetCell);
        row.appendChild(gearTypeCell);
        row.appendChild(typeCell);
        row.appendChild(descCell);
        
        return row;
    }

    setupArmorTableSorting() {
        const headers = document.querySelectorAll('#armor-table th.sortable');
        
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.dataset.column;
                const currentSort = header.classList.contains('sort-asc') ? 'asc' : 
                                 header.classList.contains('sort-desc') ? 'desc' : 'none';
                
                // Remove sort classes from all headers
                headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
                
                // Apply new sort
                let newSort = 'asc';
                if (currentSort === 'asc') newSort = 'desc';
                else if (currentSort === 'desc') newSort = 'asc';
                
                header.classList.add(`sort-${newSort}`);
                this.sortArmorTable(column, newSort);
            });
        });
    }

    sortArmorTable(column, direction) {
        const tableBody = document.getElementById('armor-table-body');
        const rows = Array.from(tableBody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            let aVal = '';
            let bVal = '';
            
            switch (column) {
                case 'name':
                    aVal = a.dataset.name;
                    bVal = b.dataset.name;
                    break;
                case 'gearset':
                    aVal = a.dataset.gearset;
                    bVal = b.dataset.gearset;
                    break;
                case 'geartype':
                    aVal = a.dataset.geartype;
                    bVal = b.dataset.geartype;
                    break;
                case 'type':
                    aVal = a.dataset.type;
                    bVal = b.dataset.type;
                    break;
                default:
                    return 0;
            }
            
            if (direction === 'asc') {
                return aVal.localeCompare(bVal);
            } else {
                return bVal.localeCompare(aVal);
            }
        });
        
        // Clear and re-append sorted rows
        tableBody.innerHTML = '';
        rows.forEach(row => tableBody.appendChild(row));
    }

    setupArmorTableSearch() {
        const searchInput = document.getElementById('armor-table-search');
        const clearBtn = document.getElementById('armor-search-clear');
        
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            this.filterArmorTable(e.target.value);
        });
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                this.filterArmorTable('');
            });
        }
    }

    setupArmorTableFilters() {
        const armorTypeFilter = document.getElementById('armor-type-filter');
        const languageFilter = document.getElementById('armor-language-filter');
        
        if (armorTypeFilter) {
            armorTypeFilter.addEventListener('change', (e) => {
                this.filterArmorTableByType(e.target.value);
            });
        }
        
        if (languageFilter) {
            languageFilter.addEventListener('change', (e) => {
                this.switchArmorTableLanguage(e.target.value);
            });
        }
    }

    filterArmorTable(searchTerm) {
        const tableBody = document.getElementById('armor-table-body');
        const rows = tableBody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const matches = text.includes(searchTerm.toLowerCase());
            row.style.display = matches ? '' : 'none';
        });
    }

    filterArmorTableByType(armorType) {
        const tableBody = document.getElementById('armor-table-body');
        const rows = tableBody.querySelectorAll('tr');
        
        rows.forEach(row => {
            if (!armorType) {  
                row.style.display = '';
            } else {
                const matches = row.dataset.geartype === armorType;
                row.style.display = matches ? '' : 'none';
            }
        });
    }

    switchArmorTableLanguage(language) {
        const tableBody = document.getElementById('armor-table-body');
        const rows = tableBody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const descCell = row.querySelector('.table-description');
            if (descCell) {
                const description = language === 'th' ? row.dataset.descTh : row.dataset.descEn;
                if (description) {
                    const truncatedDesc = description.length > 100 ? description.substring(0, 100) + '...' : description;
                    descCell.innerHTML = truncatedDesc.replace(/\n/g, '<br>');
                    descCell.setAttribute('data-full-desc', description.replace(/"/g, '&quot;'));
                    descCell.classList.remove('expanded');
                } else {
                    descCell.innerHTML = 'No description available';
                }
                descCell.setAttribute('data-lang', language);
            }
        });
        
        // Save language preference (same as weapons table)
        this.currentTableLanguage = language;
        localStorage.setItem('weaponsTableLanguage', language);
        
        console.log(`Armor table language switched to: ${language}`);
    }

    createArmorCard(armor) {
        const card = document.createElement('div');
        card.className = 'item-card';
        
        // Handle new armor structure
        const keywordBadges = armor.keyword_type ? 
            armor.keyword_type.split(',').map(keyword => 
                `<span class="keyword-badge">${keyword.trim()}</span>`
            ).join('') : '';
        
        const cardContent = `
            <div class="item-header">
                <div class="item-title-section">
                    <h3>${armor.name}</h3>
                    ${keywordBadges ? `<div class="keyword-tags">${keywordBadges}</div>` : ''}
                </div>
                ${armor.img ? `<div class="item-image"><img src="${armor.img}" alt="${armor.name}" onerror="this.style.display='none'"></div>` : ''}
            </div>
            <div class="item-details">
                <p><strong>Gear Set:</strong> ${armor.gearset}</p>
                <p><strong>Gear Type:</strong> ${armor.geartype}</p>
                <p><strong>Type:</strong> ${armor.type || 'N/A'}</p>
                <p><strong>Damage Type:</strong> ${armor.damage_type || 'N/A'}</p>
                ${armor.desc_en ? `
                    <div class="item-description">
                        <strong>Description:</strong>
                        <div class="desc-content">${armor.desc_en.replace(/\n/g, '<br>')}</div>
                    </div>
                ` : ''}
            </div>
        `;
        
        card.innerHTML = cardContent;
        return card;
    }

    getFallbackArmor() {
        // Return fallback armor data for table
        return [
            { 
                id: 1, 
                name: 'Combat Helmet', 
                gearset: 'Military', 
                geartype: 'Helmet', 
                type: 'heavy', 
                damage_type: 'physical',
                desc_en: 'Standard military helmet providing basic protection',
                desc_th: 'หมวกกันน็อคทหารมาตรฐานให้การป้องกันพื้นฐาน'
            },
            { 
                id: 2, 
                name: 'Tactical Vest', 
                gearset: 'Military', 
                geartype: 'Chest', 
                type: 'medium', 
                damage_type: 'physical',
                desc_en: 'Tactical chest armor with multiple pouches',
                desc_th: 'เสื้อเกราะยุทธวิธีมีกระเป๋าหลายช่อง'
            }
        ];
    }

    // Utility Functions
    copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

    // Description toggle functionality
    toggleDescription(element) {
        const isExpanded = element.classList.contains('expanded');
        const fullDesc = element.dataset.fullDesc;
        
        if (!fullDesc || fullDesc === element.textContent) return;
        
        if (isExpanded) {
            // Collapse: show truncated version
            const truncatedDesc = fullDesc.length > 100 ? fullDesc.substring(0, 100) + '...' : fullDesc;
            element.innerHTML = truncatedDesc.replace(/\n/g, '<br>');
            element.classList.remove('expanded');
        } else {
            // Expand: show full description
            element.innerHTML = fullDesc.replace(/\n/g, '<br>');
            element.classList.add('expanded');
        }
    }

    // Enhanced select with images
    enhanceSelectWithImages(selectElement) {
        try {
            // Check if custom dropdown already exists - skip if already enhanced
            const existingCustom = selectElement.parentNode.querySelector('.custom-select-dropdown');
            if (existingCustom) {
                return;
            }

            // Create custom dropdown container
            const customContainer = document.createElement('div');
            customContainer.className = 'custom-select-dropdown';
            customContainer.style.cssText = `
                position: relative;
                width: 100%;
            `;

            // Check if this select should have search functionality
            const hasSearch = selectElement.classList.contains('item-select') || selectElement.classList.contains('mod-select');
            
            // Create display element (shows selected item or search input)
            const displayElement = document.createElement('div');
            displayElement.className = 'select-display';
            displayElement.style.cssText = `
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 12px;
                background: var(--bg-primary);
                border: 2px solid var(--border-color);
                border-radius: 8px;
                cursor: pointer;
                min-height: 45px;
                position: relative;
                user-select: none;
            `;
            
            // Create search input for searchable dropdowns
            let searchInput = null;
            if (hasSearch) {
                searchInput = document.createElement('input');
                searchInput.type = 'text';
                searchInput.placeholder = 'Search or select...';
                searchInput.className = 'dropdown-search';
                searchInput.style.cssText = `
                    border: none;
                    background: transparent;
                    outline: none;
                    flex: 1;
                    font-size: 0.9rem;
                    color: var(--text-primary);
                    display: none;
                `;
            }

            // Create dropdown arrow
            const arrow = document.createElement('span');
            arrow.innerHTML = '▼';
            arrow.style.cssText = `
                position: absolute;
                right: 12px;
                color: var(--text-dim);
                font-size: 12px;
                pointer-events: none;
            `;

            if (searchInput) {
                displayElement.appendChild(searchInput);
            }
            displayElement.appendChild(arrow);

            // Create dropdown list
            const dropdownList = document.createElement('div');
            dropdownList.className = 'dropdown-list';
            dropdownList.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--bg-secondary);
                border: 2px solid var(--border-color);
                border-radius: 8px;
                max-height: 200px;
                overflow-y: auto;
                z-index: 1000;
                display: none;
                box-shadow: 0 4px 15px var(--shadow-dark);
            `;
            
            // Store original options for search filtering
            const originalOptions = Array.from(selectElement.options);

            // Function to populate/repopulate dropdown list
            const populateDropdownList = (options) => {
                dropdownList.innerHTML = '';
                options.forEach((option, index) => {
                    const item = document.createElement('div');
                    item.className = 'select-option';
                    item.dataset.originalIndex = Array.from(selectElement.options).indexOf(option);
                    item.style.cssText = `
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 8px 12px;
                        cursor: pointer;
                        transition: background 0.2s ease;
                    `;

                    const img = option.getAttribute('data-img');
                    const imgElement = document.createElement('div');
                    
                    if (img && img !== '') {
                        imgElement.innerHTML = `<img src="${img}" alt="${option.textContent}" style="width: 24px; height: 24px; border-radius: 4px; object-fit: cover; border: 1px solid var(--border-color);" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                               <div class="no-image" style="display: none; width: 24px; height: 24px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 4px; align-items: center; justify-content: center; font-size: 10px; color: var(--text-dim);">🖼️</div>`;
                    } else {
                        imgElement.innerHTML = `<div class="no-image" style="width: 24px; height: 24px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--text-dim);">🖼️</div>`;
                    }

                    const textElement = document.createElement('span');
                    textElement.textContent = option.textContent;
                    textElement.style.cssText = `
                        flex: 1;
                        font-size: 0.9rem;
                        color: var(--text-primary);
                    `;

                    item.appendChild(imgElement);
                    item.appendChild(textElement);

                    // Add hover effect
                    item.addEventListener('mouseenter', () => {
                        item.style.background = 'var(--bg-tertiary)';
                    });
                    item.addEventListener('mouseleave', () => {
                        item.style.background = 'transparent';
                    });

                    // Add click handler
                    item.addEventListener('click', () => {
                        const originalIndex = parseInt(item.dataset.originalIndex);
                        selectElement.selectedIndex = originalIndex;
                        selectElement.dispatchEvent(new Event('change'));
                        this.updateSelectDisplay(displayElement, option, hasSearch, searchInput);
                        dropdownList.style.display = 'none';
                        
                        // Hide search input and show selected item
                        if (hasSearch && searchInput) {
                            searchInput.style.display = 'none';
                            searchInput.value = '';
                        }
                    });

                    dropdownList.appendChild(item);
                });
            };
            
            // Initial population
            populateDropdownList(originalOptions);
            
            // Add search functionality
            if (hasSearch && searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    const filteredOptions = originalOptions.filter(option => 
                        option.textContent.toLowerCase().includes(searchTerm)
                    );
                    populateDropdownList(filteredOptions);
                });
                
                searchInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        dropdownList.style.display = 'none';
                        searchInput.style.display = 'none';
                        searchInput.value = '';
                    }
                });
            }

            // Toggle dropdown
            displayElement.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = dropdownList.style.display === 'block';
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-list').forEach(list => {
                    list.style.display = 'none';
                });
                
                // Hide all search inputs
                document.querySelectorAll('.dropdown-search').forEach(input => {
                    input.style.display = 'none';
                    input.value = '';
                });
                
                if (!isOpen) {
                    dropdownList.style.display = 'block';
                    
                    // Show search input for searchable dropdowns
                    if (hasSearch && searchInput) {
                        searchInput.style.display = 'block';
                        searchInput.focus();
                        // Reset to show all options when opening
                        populateDropdownList(originalOptions);
                    }
                    
                    // Position dropdown
                    const rect = displayElement.getBoundingClientRect();
                    const spaceBelow = window.innerHeight - rect.bottom;
                    const spaceAbove = rect.top;
                    
                    if (spaceBelow < 200 && spaceAbove > spaceBelow) {
                        dropdownList.style.top = 'auto';
                        dropdownList.style.bottom = '100%';
                    } else {
                        dropdownList.style.top = '100%';
                        dropdownList.style.bottom = 'auto';
                    }
                }
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                dropdownList.style.display = 'none';
            });

            // Initialize display
            this.updateSelectDisplay(displayElement, selectElement.options[0], hasSearch, searchInput);

            // Build custom dropdown
            customContainer.appendChild(displayElement);
            customContainer.appendChild(dropdownList);

            // Replace original select
            selectElement.style.display = 'none';
            selectElement.parentNode.insertBefore(customContainer, selectElement.nextSibling);
            
        } catch (error) {
            console.warn('Could not enhance select with images:', error);
            // Fallback - just use the original select
        }
    }

    // Cleanup function to reset selects to original state (only when really needed)
    cleanupCustomDropdowns() {
        const customDropdowns = document.querySelectorAll('.custom-select-dropdown');
        customDropdowns.forEach(dropdown => {
            dropdown.remove();
        });
        
        // Show original selects
        const originalSelects = document.querySelectorAll('.item-select, .mod-select');
        originalSelects.forEach(select => {
            select.style.display = 'block';
        });
    }

    updateSelectDisplay(displayElement, option, hasSearch = false, searchInput = null) {
        const arrow = displayElement.querySelector('span');
        displayElement.innerHTML = '';
        
        // Add search input first if it exists
        if (hasSearch && searchInput) {
            displayElement.appendChild(searchInput);
        }
        
        // Create content container for selected item display
        const contentContainer = document.createElement('div');
        contentContainer.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        `;
        
        if (option && option.value) {
            const img = option.getAttribute('data-img');
            const imgElement = document.createElement('div');
            
            if (img && img !== '') {
                imgElement.innerHTML = `<img src="${img}" alt="${option.textContent}" style="width: 24px; height: 24px; border-radius: 4px; object-fit: cover; border: 1px solid var(--border-color);" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                       <div class="no-image" style="display: none; width: 24px; height: 24px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 4px; align-items: center; justify-content: center; font-size: 10px; color: var(--text-dim);">🖼️</div>`;
            } else {
                imgElement.innerHTML = `<div class="no-image" style="width: 24px; height: 24px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--text-dim);">🖼️</div>`;
            }

            const textElement = document.createElement('span');
            textElement.textContent = option.textContent;
            textElement.style.cssText = `
                flex: 1;
                font-size: 0.9rem;
                color: var(--text-primary);
            `;

            contentContainer.appendChild(imgElement);
            contentContainer.appendChild(textElement);
        } else {
            const placeholderText = document.createElement('span');
            placeholderText.textContent = hasSearch ? 'Search or select...' : 'Select an item...';
            placeholderText.style.cssText = `
                color: var(--text-dim);
                font-style: italic;
                flex: 1;
            `;
            contentContainer.appendChild(placeholderText);
        }
        
        displayElement.appendChild(contentContainer);
        displayElement.appendChild(arrow);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            backgroundColor: type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db',
            color: 'white',
            borderRadius: '8px',
            zIndex: '9999',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Additional CSS for build cards and notifications
const additionalStyles = `
<style>
.build-card {
    background: linear-gradient(135deg, #34495e, #2c3e50);
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
}

.build-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(52,152,219,0.3);
}

.build-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #34495e;
}

.build-header h3 {
    color: #3498db;
    margin: 0;
}

.build-actions {
    display: flex;
    gap: 10px;
}

.btn-export, .btn-delete {
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.btn-export {
    background: linear-gradient(135deg, #2ecc71, #27ae60);
    color: white;
}

.btn-export:hover {
    background: linear-gradient(135deg, #27ae60, #219a52);
}

.btn-delete {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white;
}

.btn-delete:hover {
    background: linear-gradient(135deg, #c0392b, #a93226);
}

.build-section {
    margin-bottom: 10px;
    color: #ecf0f1;
}

.build-meta {
    margin-top: 15px;
    padding-top: 10px;
    border-top: 1px solid #34495e;
}

.build-meta small {
    color: #7f8c8d;
}

.no-content, .loading {
    text-align: center;
    color: #7f8c8d;
    font-style: italic;
    padding: 40px;
}

.builds-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
}
</style>
`;

// Add additional styles to head
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Initialize the application when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new OnceHumanApp();
});
