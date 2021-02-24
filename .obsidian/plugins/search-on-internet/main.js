'use strict';

var obsidian = require('obsidian');
var require$$0 = require('util');
var path = require('path');
var childProcess = require('child_process');
var fs = require('fs');
var os = require('os');

function _interopDefaultLegacy(e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var childProcess__default = /*#__PURE__*/_interopDefaultLegacy(childProcess);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var DEFAULT_SETTING = {
    searches: [{
        tags: [],
        query: 'https://www.google.com/search?&q={{query}}',
        name: 'Google',
    }, {
        tags: [],
        query: 'https://ru.wikipedia.org/wiki/Special:Search/{{query}}',
        name: 'Wikipedia',
    }],
    useIframe: true,
};
var parseTags = function (inputs) {
    return inputs.split(',')
        .map(function (s) { return s.trim(); })
        .filter(function (s) { return /^#([A-Za-z])\w+$/.test(s); });
};
var SOISettingTab = /** @class */ (function (_super) {
    __extends(SOISettingTab, _super);
    function SOISettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SOISettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        var plugin = this.plugin;
        new obsidian.Setting(containerEl)
            .setName('Open in iframe')
            .setDesc('If set to true, this will open your searches in an iframe within Obsidian. ' +
                'Otherwise, it will open in your default browser.')
            .addToggle(function (toggle) {
                toggle.setValue(_this.plugin.settings.useIframe)
                    .onChange(function (new_value) {
                        _this.plugin.settings.useIframe = new_value;
                        _this.plugin.saveData(_this.plugin.settings);
                    });
            });
        // Code mostly taken from https://github.com/SilentVoid13/Templater/blob/master/src/settings.ts
        plugin.settings.searches.forEach(function (search) {
            var div = containerEl.createEl('div');
            div.addClass('soi_div');
            new obsidian.Setting(div) //
                .addExtraButton(function (extra) {
                    extra.setIcon('cross')
                        .setTooltip('Delete')
                        .onClick(function () {
                            var index = plugin.settings.searches.indexOf(search);
                            if (index > -1) {
                                plugin.settings.searches.splice(index, 1);
                                // Force refresh
                                _this.display();
                            }
                        });
                })
                .addText(function (text) {
                    return text.setPlaceholder('Search name')
                        .setValue(search.name)
                        .onChange(function (newValue) {
                            var index = plugin.settings.searches.indexOf(search);
                            if (index > -1) {
                                search.name = newValue;
                                plugin.saveSettings();
                                // title.textContent = newValue;
                            }
                        });
                }).setName('Name')
                .setDesc('Name of the search. Click the cross to delete the search.');
            new obsidian.Setting(div)
                .addTextArea(function (text) {
                    var t = text.setPlaceholder('Search query')
                        .setValue(search.query)
                        .onChange(function (newQuery) {
                            var index = plugin.settings.searches.indexOf(search);
                            if (index > -1) {
                                search.query = newQuery;
                                plugin.saveSettings();
                            }
                        });
                    t.inputEl.setAttr('rows', 2);
                    return t; //
                }).setName('URL')
                .setDesc('URL to open when executing the search. ' +
                    'Use {{query}} to refer to the query, which is either the selected text, or the title of a note.');
            new obsidian.Setting(div).addText(function (text) {
                return text.setPlaceholder('')
                    .setValue(search.tags.join(', '))
                    .onChange(function (newValue) {
                        var index = plugin.settings.searches.indexOf(search);
                        if (index > -1) {
                            search.tags = parseTags(newValue);
                            plugin.saveSettings();
                        }
                    });
            }).setName('Tags')
                .setDesc('Only add search to notes with these comma-separated tags. Leave empty to use all tags.');
        });
        var div = containerEl.createEl('div');
        div.addClass('soi_div2');
        var setting = new obsidian.Setting(containerEl)
            .addButton(function (button) {
                return button.setButtonText('Add Search').onClick(function () {
                    plugin.settings.searches.push({
                        name: '',
                        query: '',
                        tags: [],
                    });
                    // Force refresh
                    _this.display();
                });
            });
        setting.infoEl.remove();
        div.appendChild(containerEl.lastChild);
    };
    return SOISettingTab;
}(obsidian.PluginSettingTab));

function createCommonjsModule(fn, basedir, module) {
    return module = {
        path: basedir,
        exports: {},
        require: function (path, base) {
            return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
        }
    }, fn(module, module.exports), module.exports;
}

function commonjsRequire() {
    throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

let isDocker;

function hasDockerEnv() {
    try {
        fs__default['default'].statSync('/.dockerenv');
        return true;
    } catch (_) {
        return false;
    }
}

function hasDockerCGroup() {
    try {
        return fs__default['default'].readFileSync('/proc/self/cgroup', 'utf8').includes('docker');
    } catch (_) {
        return false;
    }
}

var isDocker_1 = () => {
    if (isDocker === undefined) {
        isDocker = hasDockerEnv() || hasDockerCGroup();
    }

    return isDocker;
};

var isWsl_1 = createCommonjsModule(function (module) {




    const isWsl = () => {
        if (process.platform !== 'linux') {
            return false;
        }

        if (os__default['default'].release().toLowerCase().includes('microsoft')) {
            if (isDocker_1()) {
                return false;
            }

            return true;
        }

        try {
            return fs__default['default'].readFileSync('/proc/version', 'utf8').toLowerCase().includes('microsoft') ?
                !isDocker_1() : false;
        } catch (_) {
            return false;
        }
    };

    if (process.env.__IS_WSL_TEST__) {
        module.exports = isWsl;
    } else {
        module.exports = isWsl();
    }
});

const { promisify } = require$$0__default['default'];






const pAccess = promisify(fs__default['default'].access);

// Path to included `xdg-open`.
const localXdgOpenPath = path__default['default'].join(__dirname, 'xdg-open');

var open = async (target, options) => {
    if (typeof target !== 'string') {
        throw new TypeError('Expected a `target`');
    }

    options = {
        wait: false,
        background: false,
        allowNonzeroExitCode: false,
        ...options
    };

    let command;
    let { app } = options;
    let appArguments = [];
    const cliArguments = [];
    const childProcessOptions = {};

    if (Array.isArray(app)) {
        appArguments = app.slice(1);
        app = app[0];
    }

    if (process.platform === 'darwin') {
        command = 'open';

        if (options.wait) {
            cliArguments.push('--wait-apps');
        }

        if (options.background) {
            cliArguments.push('--background');
        }

        if (app) {
            cliArguments.push('-a', app);
        }
    } else if (process.platform === 'win32' || (isWsl_1 && !isDocker_1())) {
        command = isWsl_1 ?
            '/mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe' :
            `${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`;

        cliArguments.push(
            '-NoProfile',
            '-NonInteractive',
            '–ExecutionPolicy',
            'Bypass',
            '-EncodedCommand'
        );

        if (!isWsl_1) {
            childProcessOptions.windowsVerbatimArguments = true;
        }

        const encodedArguments = ['Start'];

        if (options.wait) {
            encodedArguments.push('-Wait');
        }

        if (app) {
            // Double quote with double quotes to ensure the inner quotes are passed through.
            // Inner quotes are delimited for PowerShell interpretation with backticks.
            encodedArguments.push(`"\`"${app}\`""`, '-ArgumentList');
            appArguments.unshift(target);
        } else {
            encodedArguments.push(`"\`"${target}\`""`);
        }

        if (appArguments.length > 0) {
            appArguments = appArguments.map(arg => `"\`"${arg}\`""`);
            encodedArguments.push(appArguments.join(','));
        }

        // Using Base64-encoded command, accepted by PowerShell, to allow special characters.
        target = Buffer.from(encodedArguments.join(' '), 'utf16le').toString('base64');
    } else {
        if (app) {
            command = app;
        } else {
            // When bundled by Webpack, there's no actual package file path and no local `xdg-open`.
            const isBundled = !__dirname || __dirname === '/';

            // Check if local `xdg-open` exists and is executable.
            let exeLocalXdgOpen = false;
            try {
                await pAccess(localXdgOpenPath, fs__default['default'].constants.X_OK);
                exeLocalXdgOpen = true;
            } catch (_) { }

            const useSystemXdgOpen = process.versions.electron ||
                process.platform === 'android' || isBundled || !exeLocalXdgOpen;
            command = useSystemXdgOpen ? 'xdg-open' : localXdgOpenPath;
        }

        if (appArguments.length > 0) {
            cliArguments.push(...appArguments);
        }

        if (!options.wait) {
            // `xdg-open` will block the process unless stdio is ignored
            // and it's detached from the parent even if it's unref'd.
            childProcessOptions.stdio = 'ignore';
            childProcessOptions.detached = true;
        }
    }

    cliArguments.push(target);

    if (process.platform === 'darwin' && appArguments.length > 0) {
        cliArguments.push('--args', ...appArguments);
    }

    const subprocess = childProcess__default['default'].spawn(command, cliArguments, childProcessOptions);

    if (options.wait) {
        return new Promise((resolve, reject) => {
            subprocess.once('error', reject);

            subprocess.once('close', exitCode => {
                if (options.allowNonzeroExitCode && exitCode > 0) {
                    reject(new Error(`Exited with code ${exitCode}`));
                    return;
                }

                resolve(subprocess);
            });
        });
    }

    subprocess.unref();

    return subprocess;
};

var SearchModal = /** @class */ (function (_super) {
    __extends(SearchModal, _super);
    function SearchModal(app, plugin, query) {
        var _this = _super.call(this, app) || this;
        _this.plugin = plugin;
        _this.setPlaceholder('');
        _this.query = query;
        _this.setInstructions([{ command: '↑↓', purpose: 'to navigate' }, { command: '↵', purpose: "to search " + _this.query }, { command: 'esc', purpose: 'to dismiss' }]);
        return _this;
    }
    SearchModal.prototype.onOpen = function () {
        _super.prototype.onOpen.call(this);
        // const {contentEl} = this;
        this.inputEl.focus();
    };
    SearchModal.prototype.onClose = function () {
        _super.prototype.onClose.call(this);
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    SearchModal.prototype.getItemText = function (item) {
        return item.name;
    };
    SearchModal.prototype.renderSuggestion = function (item, el) {
        _super.prototype.renderSuggestion.call(this, item, el);
        el.innerHTML = "Search on: " + el.innerHTML;
    };
    SearchModal.prototype.getItems = function () {
        return this.plugin.settings.searches;
    };
    SearchModal.prototype.onChooseItem = function (item, evt) {
        this.plugin.openSearch(item, this.query);
    };
    return SearchModal;
}(obsidian.FuzzySuggestModal));

var SearchView = /** @class */ (function (_super) {
    __extends(SearchView, _super);
    function SearchView(plugin, leaf, query, site, url) {
        var _this = _super.call(this, leaf) || this;
        _this.query = query;
        _this.site = site;
        _this.url = url;
        _this.plugin = plugin;
        return _this;
    }
    SearchView.prototype.onOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.frame = document.createElement('iframe');
                this.frame.addClass("soi-site");
                this.frame.setAttr('style', 'height: 100%; width:100%');
                this.frame.setAttr('src', this.url);
                this.frame.setAttr('tabindex', '0');
                this.containerEl.children[1].appendChild(this.frame);
                return [2 /*return*/];
            });
        });
    };
    SearchView.prototype.getDisplayText = function () {
        return this.site + ": " + this.query;
    };
    SearchView.prototype.getViewType = function () {
        return 'Search on Internet';
    };
    return SearchView;
}(obsidian.ItemView));

var SearchOnInternetPlugin = /** @class */ (function (_super) {
    __extends(SearchOnInternetPlugin, _super);
    function SearchOnInternetPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchOnInternetPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var plugin;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('loading search-on-internet');
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addSettingTab(new SOISettingTab(this.app, this));
                        plugin = this;
                        this.registerEvent(this.app.workspace.on('file-menu', function (menu, file, source) {
                            var _a, _b;
                            if (file === null) {
                                return;
                            }
                            var fileTags = (_b = (_a = _this.app.metadataCache.getFileCache(file)) === null || _a === void 0 ? void 0 : _a.tags) === null || _b === void 0 ? void 0 : _b.map(function (t) { return t.tag; });
                            _this.settings.searches.forEach(function (search) {
                                if (search.tags.length === 0 || (fileTags === null || fileTags === void 0 ? void 0 : fileTags.some(function (t) { return search.tags.contains(t); }))) {
                                    menu.addItem(function (item) {
                                        item.setTitle("Search " + search.name).setIcon('search')
                                            .onClick(function (evt) {
                                                plugin.openSearch(search, file.basename);
                                            });
                                    });
                                }
                            });
                        }));
                        this.addCommand({
                            id: 'search-on-internet',
                            name: 'Perform search',
                            callback: function () {
                                var query = _this.getSelectedText();
                                if (query === null || query === '') {
                                    var activeView = _this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                                    if (activeView == null) {
                                        return;
                                    }
                                    query = activeView.getDisplayText();
                                }
                                var modal = new SearchModal(plugin.app, plugin, query);
                                modal.open();
                            },
                        });
                        // Changing the context menu is a bit problematic:
                        // Obsidian sometimes uses its own context menu, eg when right-clicking
                        // on internal link. But other times, it's a context menu that
                        // cannot really be edited easily. It would be nice if Obsidian
                        // provided its own context menu everywhere to hook into.
                        this.registerCodeMirror(function (cm) {
                            // @ts-ignore
                            cm.resetSelectionOnContextMenu = false;
                            cm.on('contextmenu', function (editor, event) {
                                console.log(editor);
                                console.log(event);
                                _this.handleContext(event);
                            });
                        });
                        document.on('contextmenu', '.markdown-preview-view', function (event) {
                            console.log(event);
                            _this.handleContext(event);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchOnInternetPlugin.prototype.getSelectedText = function () {
        var wSelection = window.getSelection();
        var docSelection = document === null || document === void 0 ? void 0 : document.getSelection();
        if (wSelection) {
            return wSelection.toString();
        }
        else if (document && docSelection.type != 'Control') {
            return docSelection.toString();
        }
        return null;
    };
    SearchOnInternetPlugin.prototype.handleContext = function (e, activeView) {
        if (activeView === void 0) { activeView = null; }
        return __awaiter(this, void 0, void 0, function () {
            var query, fileMenu, _loop_1, _i, _a, setting;
            var _this = this;
            return __generator(this, function (_b) {
                query = this.getSelectedText();
                if (query === null || query === '') {
                    return [2 /*return*/];
                }
                fileMenu = new obsidian.Menu();
                _loop_1 = function (setting) {
                    fileMenu.addItem(function (item) {
                        item.setTitle("Search " + setting.name).setIcon('search')
                            .onClick(function (evt) {
                                _this.openSearch(setting, query, activeView);
                            });
                    });
                };
                for (_i = 0, _a = this.settings.searches; _i < _a.length; _i++) {
                    setting = _a[_i];
                    _loop_1(setting);
                }
                fileMenu.showAtPosition({ x: e.x, y: e.y });
                e.preventDefault();
                return [2 /*return*/];
            });
        });
    };
    SearchOnInternetPlugin.prototype.openSearch = function (search, query, activeView) {
        if (activeView === void 0) { activeView = null; }
        return __awaiter(this, void 0, void 0, function () {
            var encodedQuery, url, leaf, view;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        encodedQuery = encodeURIComponent(query);
                        url = search.query.replace('{{title}}', encodedQuery)
                            .replace('{{query}}', encodedQuery);
                        console.log("SOI: Opening URL " + url);
                        if (!this.settings.useIframe) return [3 /*break*/, 4];
                        if (!activeView) return [3 /*break*/, 1];
                        activeView.frame.setAttr('src', url);
                        activeView.url = url;
                        return [3 /*break*/, 3];
                    case 1:
                        leaf = this.app.workspace.getLeaf(!(this.app.workspace.activeLeaf.view.getViewType() === 'empty'));
                        view = new SearchView(this, leaf, query, search.name, url);
                        return [4 /*yield*/, leaf.open(view)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, open(url)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SearchOnInternetPlugin.prototype.onunload = function () {
        console.log('unloading search-on-internet');
    };
    SearchOnInternetPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadedSettings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadData()];
                    case 1:
                        loadedSettings = _a.sent();
                        if (loadedSettings && loadedSettings.hasOwnProperty('searches')) {
                            this.settings = loadedSettings;
                        }
                        else {
                            this.settings = DEFAULT_SETTING;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchOnInternetPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SearchOnInternetPlugin;
}(obsidian.Plugin));

module.exports = SearchOnInternetPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNldHRpbmdzLnRzIiwibm9kZV9tb2R1bGVzL2lzLWRvY2tlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9pcy13c2wvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb3Blbi9pbmRleC5qcyIsIm1vZGFsLnRzIiwidmlldy50cyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20pIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxyXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcclxuICAgIHJldHVybiB0bztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHtBcHAsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmd9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCBTZWFyY2hPbkludGVybmV0UGx1Z2luIGZyb20gJy4vbWFpbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoU2V0dGluZyB7XG4gICAgdGFnczogc3RyaW5nW107XG4gICAgcXVlcnk6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU09JU2V0dGluZ3Mge1xuICAgIHNlYXJjaGVzOiBTZWFyY2hTZXR0aW5nW107XG4gICAgdXNlSWZyYW1lOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HOiBTT0lTZXR0aW5ncyA9IHtcbiAgc2VhcmNoZXM6IFt7XG4gICAgdGFnczogW10gYXMgc3RyaW5nW10sXG4gICAgcXVlcnk6ICdodHRwczovL3d3dy5nb29nbGUuY29tL3NlYXJjaD8mcT17e3F1ZXJ5fX0nLFxuICAgIG5hbWU6ICdHb29nbGUnLFxuICB9IGFzIFNlYXJjaFNldHRpbmcsIHtcbiAgICB0YWdzOiBbXSBhcyBzdHJpbmdbXSxcbiAgICBxdWVyeTogJ2h0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NwZWNpYWw6U2VhcmNoL3t7cXVlcnl9fScsXG4gICAgbmFtZTogJ1dpa2lwZWRpYScsXG4gIH0gYXMgU2VhcmNoU2V0dGluZ10sXG4gIHVzZUlmcmFtZTogdHJ1ZSxcbn07XG5cbmNvbnN0IHBhcnNlVGFncyA9IGZ1bmN0aW9uKGlucHV0czogc3RyaW5nKTogc3RyaW5nW10ge1xuICByZXR1cm4gaW5wdXRzLnNwbGl0KCcsJylcbiAgICAgIC5tYXAoKHMpID0+IHMudHJpbSgpKVxuICAgICAgLmZpbHRlcigocykgPT4gL14jKFtBLVphLXpdKVxcdyskLy50ZXN0KHMpKTtcbn07XG5cblxuZXhwb3J0IGNsYXNzIFNPSVNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgICBwbHVnaW46IFNlYXJjaE9uSW50ZXJuZXRQbHVnaW47XG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBTZWFyY2hPbkludGVybmV0UGx1Z2luKSB7XG4gICAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICB9XG5cbiAgICBkaXNwbGF5KCk6IHZvaWQge1xuICAgICAgY29uc3Qge2NvbnRhaW5lckVsfSA9IHRoaXM7XG5cbiAgICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMucGx1Z2luO1xuXG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAuc2V0TmFtZSgnT3BlbiBpbiBpZnJhbWUnKVxuICAgICAgICAgIC5zZXREZXNjKCdJZiBzZXQgdG8gdHJ1ZSwgdGhpcyB3aWxsIG9wZW4geW91ciBzZWFyY2hlcyBpbiBhbiBpZnJhbWUgd2l0aGluIE9ic2lkaWFuLiAnICtcbiAgICAgICAgICAgICAgICAnT3RoZXJ3aXNlLCBpdCB3aWxsIG9wZW4gaW4geW91ciBkZWZhdWx0IGJyb3dzZXIuJylcbiAgICAgICAgICAuYWRkVG9nZ2xlKCh0b2dnbGUpID0+IHtcbiAgICAgICAgICAgIHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VJZnJhbWUpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKChuZXdfdmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUlmcmFtZSA9IG5ld192YWx1ZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgLy8gQ29kZSBtb3N0bHkgdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vU2lsZW50Vm9pZDEzL1RlbXBsYXRlci9ibG9iL21hc3Rlci9zcmMvc2V0dGluZ3MudHNcbiAgICAgIHBsdWdpbi5zZXR0aW5ncy5zZWFyY2hlcy5mb3JFYWNoKChzZWFyY2gpID0+IHtcbiAgICAgICAgY29uc3QgZGl2ID0gY29udGFpbmVyRWwuY3JlYXRlRWwoJ2RpdicpO1xuICAgICAgICBkaXYuYWRkQ2xhc3MoJ3NvaV9kaXYnKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhkaXYpLy9cbiAgICAgICAgICAgIC5hZGRFeHRyYUJ1dHRvbigoZXh0cmEpID0+IHtcbiAgICAgICAgICAgICAgZXh0cmEuc2V0SWNvbignY3Jvc3MnKVxuICAgICAgICAgICAgICAgICAgLnNldFRvb2x0aXAoJ0RlbGV0ZScpXG4gICAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGx1Z2luLnNldHRpbmdzLnNlYXJjaGVzLmluZGV4T2Yoc2VhcmNoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHBsdWdpbi5zZXR0aW5ncy5zZWFyY2hlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgIC8vIEZvcmNlIHJlZnJlc2hcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFkZFRleHQoKHRleHQpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRleHQuc2V0UGxhY2Vob2xkZXIoJ1NlYXJjaCBuYW1lJylcbiAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShzZWFyY2gubmFtZSlcbiAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwbHVnaW4uc2V0dGluZ3Muc2VhcmNoZXMuaW5kZXhPZihzZWFyY2gpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaC5uYW1lID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgcGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICAgIC8vIHRpdGxlLnRleHRDb250ZW50ID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuc2V0TmFtZSgnTmFtZScpXG4gICAgICAgICAgICAuc2V0RGVzYygnTmFtZSBvZiB0aGUgc2VhcmNoLiBDbGljayB0aGUgY3Jvc3MgdG8gZGVsZXRlIHRoZSBzZWFyY2guJyk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGRpdilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYSgodGV4dCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB0ID0gdGV4dC5zZXRQbGFjZWhvbGRlcignU2VhcmNoIHF1ZXJ5JylcbiAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShzZWFyY2gucXVlcnkpXG4gICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKG5ld1F1ZXJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGx1Z2luLnNldHRpbmdzLnNlYXJjaGVzLmluZGV4T2Yoc2VhcmNoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzZWFyY2gucXVlcnkgPSBuZXdRdWVyeTtcbiAgICAgICAgICAgICAgICAgICAgICBwbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0LmlucHV0RWwuc2V0QXR0cigncm93cycsIDIpO1xuICAgICAgICAgICAgICByZXR1cm4gdDsvL1xuICAgICAgICAgICAgfSkuc2V0TmFtZSgnVVJMJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdVUkwgdG8gb3BlbiB3aGVuIGV4ZWN1dGluZyB0aGUgc2VhcmNoLiAnICtcbiAgICAgICAgICAgICAgICAnVXNlIHt7cXVlcnl9fSB0byByZWZlciB0byB0aGUgcXVlcnksIHdoaWNoIGlzIGVpdGhlciB0aGUgc2VsZWN0ZWQgdGV4dCwgb3IgdGhlIHRpdGxlIG9mIGEgbm90ZS4nKTtcbiAgICAgICAgbmV3IFNldHRpbmcoZGl2KS5hZGRUZXh0KCh0ZXh0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRleHQuc2V0UGxhY2Vob2xkZXIoJycpXG4gICAgICAgICAgICAgIC5zZXRWYWx1ZShzZWFyY2gudGFncy5qb2luKCcsICcpKVxuICAgICAgICAgICAgICAub25DaGFuZ2UoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwbHVnaW4uc2V0dGluZ3Muc2VhcmNoZXMuaW5kZXhPZihzZWFyY2gpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICBzZWFyY2gudGFncyA9IHBhcnNlVGFncyhuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICBwbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuc2V0TmFtZSgnVGFncycpXG4gICAgICAgICAgICAuc2V0RGVzYygnT25seSBhZGQgc2VhcmNoIHRvIG5vdGVzIHdpdGggdGhlc2UgY29tbWEtc2VwYXJhdGVkIHRhZ3MuIExlYXZlIGVtcHR5IHRvIHVzZSBhbGwgdGFncy4nKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkaXYgPSBjb250YWluZXJFbC5jcmVhdGVFbCgnZGl2Jyk7XG4gICAgICBkaXYuYWRkQ2xhc3MoJ3NvaV9kaXYyJyk7XG5cbiAgICAgIGNvbnN0IHNldHRpbmcgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAuYWRkQnV0dG9uKChidXR0b24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBidXR0b24uc2V0QnV0dG9uVGV4dCgnQWRkIFNlYXJjaCcpLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgICBwbHVnaW4uc2V0dGluZ3Muc2VhcmNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgcXVlcnk6ICcnLFxuICAgICAgICAgICAgICAgIHRhZ3M6IFtdLFxuICAgICAgICAgICAgICB9IGFzIFNlYXJjaFNldHRpbmcpO1xuICAgICAgICAgICAgICAvLyBGb3JjZSByZWZyZXNoXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICBzZXR0aW5nLmluZm9FbC5yZW1vdmUoKTtcblxuICAgICAgZGl2LmFwcGVuZENoaWxkKGNvbnRhaW5lckVsLmxhc3RDaGlsZCk7XG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5sZXQgaXNEb2NrZXI7XG5cbmZ1bmN0aW9uIGhhc0RvY2tlckVudigpIHtcblx0dHJ5IHtcblx0XHRmcy5zdGF0U3luYygnLy5kb2NrZXJlbnYnKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoXykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5mdW5jdGlvbiBoYXNEb2NrZXJDR3JvdXAoKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGZzLnJlYWRGaWxlU3luYygnL3Byb2Mvc2VsZi9jZ3JvdXAnLCAndXRmOCcpLmluY2x1ZGVzKCdkb2NrZXInKTtcblx0fSBjYXRjaCAoXykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcblx0aWYgKGlzRG9ja2VyID09PSB1bmRlZmluZWQpIHtcblx0XHRpc0RvY2tlciA9IGhhc0RvY2tlckVudigpIHx8IGhhc0RvY2tlckNHcm91cCgpO1xuXHR9XG5cblx0cmV0dXJuIGlzRG9ja2VyO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IGlzRG9ja2VyID0gcmVxdWlyZSgnaXMtZG9ja2VyJyk7XG5cbmNvbnN0IGlzV3NsID0gKCkgPT4ge1xuXHRpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gJ2xpbnV4Jykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGlmIChvcy5yZWxlYXNlKCkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnbWljcm9zb2Z0JykpIHtcblx0XHRpZiAoaXNEb2NrZXIoKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRyZXR1cm4gZnMucmVhZEZpbGVTeW5jKCcvcHJvYy92ZXJzaW9uJywgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdtaWNyb3NvZnQnKSA/XG5cdFx0XHQhaXNEb2NrZXIoKSA6IGZhbHNlO1xuXHR9IGNhdGNoIChfKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xuXG5pZiAocHJvY2Vzcy5lbnYuX19JU19XU0xfVEVTVF9fKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gaXNXc2w7XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGlzV3NsKCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCB7cHJvbWlzaWZ5fSA9IHJlcXVpcmUoJ3V0aWwnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBjaGlsZFByb2Nlc3MgPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBpc1dzbCA9IHJlcXVpcmUoJ2lzLXdzbCcpO1xuY29uc3QgaXNEb2NrZXIgPSByZXF1aXJlKCdpcy1kb2NrZXInKTtcblxuY29uc3QgcEFjY2VzcyA9IHByb21pc2lmeShmcy5hY2Nlc3MpO1xuXG4vLyBQYXRoIHRvIGluY2x1ZGVkIGB4ZGctb3BlbmAuXG5jb25zdCBsb2NhbFhkZ09wZW5QYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ3hkZy1vcGVuJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKHRhcmdldCwgb3B0aW9ucykgPT4ge1xuXHRpZiAodHlwZW9mIHRhcmdldCAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIGB0YXJnZXRgJyk7XG5cdH1cblxuXHRvcHRpb25zID0ge1xuXHRcdHdhaXQ6IGZhbHNlLFxuXHRcdGJhY2tncm91bmQ6IGZhbHNlLFxuXHRcdGFsbG93Tm9uemVyb0V4aXRDb2RlOiBmYWxzZSxcblx0XHQuLi5vcHRpb25zXG5cdH07XG5cblx0bGV0IGNvbW1hbmQ7XG5cdGxldCB7YXBwfSA9IG9wdGlvbnM7XG5cdGxldCBhcHBBcmd1bWVudHMgPSBbXTtcblx0Y29uc3QgY2xpQXJndW1lbnRzID0gW107XG5cdGNvbnN0IGNoaWxkUHJvY2Vzc09wdGlvbnMgPSB7fTtcblxuXHRpZiAoQXJyYXkuaXNBcnJheShhcHApKSB7XG5cdFx0YXBwQXJndW1lbnRzID0gYXBwLnNsaWNlKDEpO1xuXHRcdGFwcCA9IGFwcFswXTtcblx0fVxuXG5cdGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJykge1xuXHRcdGNvbW1hbmQgPSAnb3Blbic7XG5cblx0XHRpZiAob3B0aW9ucy53YWl0KSB7XG5cdFx0XHRjbGlBcmd1bWVudHMucHVzaCgnLS13YWl0LWFwcHMnKTtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy5iYWNrZ3JvdW5kKSB7XG5cdFx0XHRjbGlBcmd1bWVudHMucHVzaCgnLS1iYWNrZ3JvdW5kJyk7XG5cdFx0fVxuXG5cdFx0aWYgKGFwcCkge1xuXHRcdFx0Y2xpQXJndW1lbnRzLnB1c2goJy1hJywgYXBwKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyB8fCAoaXNXc2wgJiYgIWlzRG9ja2VyKCkpKSB7XG5cdFx0Y29tbWFuZCA9IGlzV3NsID9cblx0XHRcdCcvbW50L2MvV2luZG93cy9TeXN0ZW0zMi9XaW5kb3dzUG93ZXJTaGVsbC92MS4wL3Bvd2Vyc2hlbGwuZXhlJyA6XG5cdFx0XHRgJHtwcm9jZXNzLmVudi5TWVNURU1ST09UfVxcXFxTeXN0ZW0zMlxcXFxXaW5kb3dzUG93ZXJTaGVsbFxcXFx2MS4wXFxcXHBvd2Vyc2hlbGxgO1xuXG5cdFx0Y2xpQXJndW1lbnRzLnB1c2goXG5cdFx0XHQnLU5vUHJvZmlsZScsXG5cdFx0XHQnLU5vbkludGVyYWN0aXZlJyxcblx0XHRcdCfigJNFeGVjdXRpb25Qb2xpY3knLFxuXHRcdFx0J0J5cGFzcycsXG5cdFx0XHQnLUVuY29kZWRDb21tYW5kJ1xuXHRcdCk7XG5cblx0XHRpZiAoIWlzV3NsKSB7XG5cdFx0XHRjaGlsZFByb2Nlc3NPcHRpb25zLndpbmRvd3NWZXJiYXRpbUFyZ3VtZW50cyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZW5jb2RlZEFyZ3VtZW50cyA9IFsnU3RhcnQnXTtcblxuXHRcdGlmIChvcHRpb25zLndhaXQpIHtcblx0XHRcdGVuY29kZWRBcmd1bWVudHMucHVzaCgnLVdhaXQnKTtcblx0XHR9XG5cblx0XHRpZiAoYXBwKSB7XG5cdFx0XHQvLyBEb3VibGUgcXVvdGUgd2l0aCBkb3VibGUgcXVvdGVzIHRvIGVuc3VyZSB0aGUgaW5uZXIgcXVvdGVzIGFyZSBwYXNzZWQgdGhyb3VnaC5cblx0XHRcdC8vIElubmVyIHF1b3RlcyBhcmUgZGVsaW1pdGVkIGZvciBQb3dlclNoZWxsIGludGVycHJldGF0aW9uIHdpdGggYmFja3RpY2tzLlxuXHRcdFx0ZW5jb2RlZEFyZ3VtZW50cy5wdXNoKGBcIlxcYFwiJHthcHB9XFxgXCJcImAsICctQXJndW1lbnRMaXN0Jyk7XG5cdFx0XHRhcHBBcmd1bWVudHMudW5zaGlmdCh0YXJnZXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbmNvZGVkQXJndW1lbnRzLnB1c2goYFwiXFxgXCIke3RhcmdldH1cXGBcIlwiYCk7XG5cdFx0fVxuXG5cdFx0aWYgKGFwcEFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRhcHBBcmd1bWVudHMgPSBhcHBBcmd1bWVudHMubWFwKGFyZyA9PiBgXCJcXGBcIiR7YXJnfVxcYFwiXCJgKTtcblx0XHRcdGVuY29kZWRBcmd1bWVudHMucHVzaChhcHBBcmd1bWVudHMuam9pbignLCcpKTtcblx0XHR9XG5cblx0XHQvLyBVc2luZyBCYXNlNjQtZW5jb2RlZCBjb21tYW5kLCBhY2NlcHRlZCBieSBQb3dlclNoZWxsLCB0byBhbGxvdyBzcGVjaWFsIGNoYXJhY3RlcnMuXG5cdFx0dGFyZ2V0ID0gQnVmZmVyLmZyb20oZW5jb2RlZEFyZ3VtZW50cy5qb2luKCcgJyksICd1dGYxNmxlJykudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChhcHApIHtcblx0XHRcdGNvbW1hbmQgPSBhcHA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFdoZW4gYnVuZGxlZCBieSBXZWJwYWNrLCB0aGVyZSdzIG5vIGFjdHVhbCBwYWNrYWdlIGZpbGUgcGF0aCBhbmQgbm8gbG9jYWwgYHhkZy1vcGVuYC5cblx0XHRcdGNvbnN0IGlzQnVuZGxlZCA9ICFfX2Rpcm5hbWUgfHwgX19kaXJuYW1lID09PSAnLyc7XG5cblx0XHRcdC8vIENoZWNrIGlmIGxvY2FsIGB4ZGctb3BlbmAgZXhpc3RzIGFuZCBpcyBleGVjdXRhYmxlLlxuXHRcdFx0bGV0IGV4ZUxvY2FsWGRnT3BlbiA9IGZhbHNlO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0YXdhaXQgcEFjY2Vzcyhsb2NhbFhkZ09wZW5QYXRoLCBmcy5jb25zdGFudHMuWF9PSyk7XG5cdFx0XHRcdGV4ZUxvY2FsWGRnT3BlbiA9IHRydWU7XG5cdFx0XHR9IGNhdGNoIChfKSB7fVxuXG5cdFx0XHRjb25zdCB1c2VTeXN0ZW1YZGdPcGVuID0gcHJvY2Vzcy52ZXJzaW9ucy5lbGVjdHJvbiB8fFxuXHRcdFx0XHRwcm9jZXNzLnBsYXRmb3JtID09PSAnYW5kcm9pZCcgfHwgaXNCdW5kbGVkIHx8ICFleGVMb2NhbFhkZ09wZW47XG5cdFx0XHRjb21tYW5kID0gdXNlU3lzdGVtWGRnT3BlbiA/ICd4ZGctb3BlbicgOiBsb2NhbFhkZ09wZW5QYXRoO1xuXHRcdH1cblxuXHRcdGlmIChhcHBBcmd1bWVudHMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y2xpQXJndW1lbnRzLnB1c2goLi4uYXBwQXJndW1lbnRzKTtcblx0XHR9XG5cblx0XHRpZiAoIW9wdGlvbnMud2FpdCkge1xuXHRcdFx0Ly8gYHhkZy1vcGVuYCB3aWxsIGJsb2NrIHRoZSBwcm9jZXNzIHVubGVzcyBzdGRpbyBpcyBpZ25vcmVkXG5cdFx0XHQvLyBhbmQgaXQncyBkZXRhY2hlZCBmcm9tIHRoZSBwYXJlbnQgZXZlbiBpZiBpdCdzIHVucmVmJ2QuXG5cdFx0XHRjaGlsZFByb2Nlc3NPcHRpb25zLnN0ZGlvID0gJ2lnbm9yZSc7XG5cdFx0XHRjaGlsZFByb2Nlc3NPcHRpb25zLmRldGFjaGVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRjbGlBcmd1bWVudHMucHVzaCh0YXJnZXQpO1xuXG5cdGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJyAmJiBhcHBBcmd1bWVudHMubGVuZ3RoID4gMCkge1xuXHRcdGNsaUFyZ3VtZW50cy5wdXNoKCctLWFyZ3MnLCAuLi5hcHBBcmd1bWVudHMpO1xuXHR9XG5cblx0Y29uc3Qgc3VicHJvY2VzcyA9IGNoaWxkUHJvY2Vzcy5zcGF3bihjb21tYW5kLCBjbGlBcmd1bWVudHMsIGNoaWxkUHJvY2Vzc09wdGlvbnMpO1xuXG5cdGlmIChvcHRpb25zLndhaXQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0c3VicHJvY2Vzcy5vbmNlKCdlcnJvcicsIHJlamVjdCk7XG5cblx0XHRcdHN1YnByb2Nlc3Mub25jZSgnY2xvc2UnLCBleGl0Q29kZSA9PiB7XG5cdFx0XHRcdGlmIChvcHRpb25zLmFsbG93Tm9uemVyb0V4aXRDb2RlICYmIGV4aXRDb2RlID4gMCkge1xuXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoYEV4aXRlZCB3aXRoIGNvZGUgJHtleGl0Q29kZX1gKSk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVzb2x2ZShzdWJwcm9jZXNzKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0c3VicHJvY2Vzcy51bnJlZigpO1xuXG5cdHJldHVybiBzdWJwcm9jZXNzO1xufTtcbiIsImltcG9ydCB7QXBwLCBGdXp6eU1hdGNoLCBGdXp6eVN1Z2dlc3RNb2RhbCwgTW9kYWx9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7U2VhcmNoU2V0dGluZ30gZnJvbSAnLi9zZXR0aW5ncyc7XG5pbXBvcnQgU2VhcmNoT25JbnRlcm5ldFBsdWdpbiBmcm9tICcuL21haW4nO1xuXG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hNb2RhbCBleHRlbmRzIEZ1enp5U3VnZ2VzdE1vZGFsPFNlYXJjaFNldHRpbmc+IHtcbiAgcGx1Z2luOiBTZWFyY2hPbkludGVybmV0UGx1Z2luO1xuICBxdWVyeTogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBTZWFyY2hPbkludGVybmV0UGx1Z2luLCBxdWVyeTogc3RyaW5nKSB7XG4gICAgc3VwZXIoYXBwKTtcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICB0aGlzLnNldFBsYWNlaG9sZGVyKCcnKTtcbiAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgJyR7dGhpcy5xdWVyeX0nO1xuICAgIHRoaXMuc2V0SW5zdHJ1Y3Rpb25zKFt7Y29tbWFuZDogJ+KGkeKGkycsIHB1cnBvc2U6ICd0byBuYXZpZ2F0ZSd9LFxuICAgICAge2NvbW1hbmQ6ICfihrUnLCBwdXJwb3NlOiBgdG8gc2VhcmNoICR7dGhpcy5xdWVyeX1gfSxcbiAgICAgIHtjb21tYW5kOiAnZXNjJywgcHVycG9zZTogJ3RvIGRpc21pc3MnfV0pO1xuICB9XG5cbiAgb25PcGVuKCkge1xuICAgIHN1cGVyLm9uT3BlbigpO1xuICAgIC8vIGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcbiAgICB0aGlzLmlucHV0RWwuZm9jdXMoKTtcbiAgfVxuXG4gIG9uQ2xvc2UoKSB7XG4gICAgc3VwZXIub25DbG9zZSgpO1xuICAgIGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcbiAgICBjb250ZW50RWwuZW1wdHkoKTtcbiAgfVxuXG5cbiAgZ2V0SXRlbVRleHQoaXRlbTogU2VhcmNoU2V0dGluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgfVxuXG4gIHJlbmRlclN1Z2dlc3Rpb24oaXRlbTogRnV6enlNYXRjaDxTZWFyY2hTZXR0aW5nPiwgZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgc3VwZXIucmVuZGVyU3VnZ2VzdGlvbihpdGVtLCBlbCk7XG4gICAgZWwuaW5uZXJIVE1MID0gYFNlYXJjaCBvbjogYCArIGVsLmlubmVySFRNTDtcbiAgfVxuXG4gIGdldEl0ZW1zKCk6IFNlYXJjaFNldHRpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMucGx1Z2luLnNldHRpbmdzLnNlYXJjaGVzO1xuICB9XG5cbiAgb25DaG9vc2VJdGVtKGl0ZW06IFNlYXJjaFNldHRpbmcsIGV2dDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLnBsdWdpbi5vcGVuU2VhcmNoKGl0ZW0sIHRoaXMucXVlcnkpO1xuICB9XG59XG4iLCJpbXBvcnQge0l0ZW1WaWV3LCBXb3Jrc3BhY2VMZWFmfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgU2VhcmNoT25JbnRlcm5ldFBsdWdpbiBmcm9tICcuL21haW4nO1xuXG5leHBvcnQgY2xhc3MgU2VhcmNoVmlldyBleHRlbmRzIEl0ZW1WaWV3IHtcbiAgICBxdWVyeTogc3RyaW5nO1xuICAgIHNpdGU6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbiAgICBwbHVnaW46IFNlYXJjaE9uSW50ZXJuZXRQbHVnaW47XG5cbiAgICBmcmFtZTogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihwbHVnaW46IFNlYXJjaE9uSW50ZXJuZXRQbHVnaW4sIGxlYWY6IFdvcmtzcGFjZUxlYWYsIHF1ZXJ5OiBzdHJpbmcsIHNpdGU6IHN0cmluZywgdXJsOiBzdHJpbmcpIHtcbiAgICAgIHN1cGVyKGxlYWYpO1xuICAgICAgdGhpcy5xdWVyeT0gcXVlcnk7XG4gICAgICB0aGlzLnNpdGUgPSBzaXRlO1xuICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICB9XG5cbiAgICBhc3luYyBvbk9wZW4oKSB7XG4gICAgICB0aGlzLmZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICB0aGlzLmZyYW1lLmFkZENsYXNzKGBzb2ktc2l0ZWApO1xuICAgICAgdGhpcy5mcmFtZS5zZXRBdHRyKCdzdHlsZScsICdoZWlnaHQ6IDEwMCU7IHdpZHRoOjEwMCUnKTtcbiAgICAgIHRoaXMuZnJhbWUuc2V0QXR0cignc3JjJywgdGhpcy51cmwpO1xuICAgICAgdGhpcy5mcmFtZS5zZXRBdHRyKCd0YWJpbmRleCcsICcwJyk7XG4gICAgICB0aGlzLmNvbnRhaW5lckVsLmNoaWxkcmVuWzFdLmFwcGVuZENoaWxkKHRoaXMuZnJhbWUpO1xuXG5cbiAgICAgIC8vIFR1cm5zIG91dCBJRnJhbWVzIGFyZSB2ZXJ5IGhhcmQgdG8gY29udHJvbCB0aGUgY29udGV4dG1lbnUgb2YuIFNvIGxlYXZpbmcgdGhpcyBmb3Igbm93IVxuICAgICAgLy8gdGhpcy5mcmFtZS5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCdhc2RmJyk7XG4gICAgICAvLyAgIHRoaXMucGx1Z2luLmhhbmRsZUNvbnRleHQoZSwgdGhpcyk7XG4gICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICBnZXREaXNwbGF5VGV4dCgpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuIGAke3RoaXMuc2l0ZX06ICR7dGhpcy5xdWVyeX1gO1xuICAgIH1cblxuICAgIGdldFZpZXdUeXBlKCk6IHN0cmluZyB7XG4gICAgICByZXR1cm4gJ1NlYXJjaCBvbiBJbnRlcm5ldCc7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtFdmVudFJlZiwgTWFya2Rvd25QcmV2aWV3VmlldywgTWFya2Rvd25WaWV3LCBNZW51LCBQbHVnaW4sIFRGaWxlfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQge1NPSVNldHRpbmdUYWIsIFNPSVNldHRpbmdzLCBERUZBVUxUX1NFVFRJTkcsIFNlYXJjaFNldHRpbmd9IGZyb20gJy4vc2V0dGluZ3MnO1xuaW1wb3J0IG9wZW4gZnJvbSAnb3Blbic7XG5pbXBvcnQge1NlYXJjaE1vZGFsfSBmcm9tICcuL21vZGFsJztcbmltcG9ydCB7U2VhcmNoVmlld30gZnJvbSAnLi92aWV3JztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hPbkludGVybmV0UGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgICBzZXR0aW5nczogU09JU2V0dGluZ3M7XG5cbiAgICBhc3luYyBvbmxvYWQoKSB7XG4gICAgICBjb25zb2xlLmxvZygnbG9hZGluZyBzZWFyY2gtb24taW50ZXJuZXQnKTtcblxuICAgICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTT0lTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG4gICAgICBjb25zdCBwbHVnaW4gPSB0aGlzO1xuICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbignZmlsZS1tZW51JywgKG1lbnUsIGZpbGU6IFRGaWxlLCBzb3VyY2U6c3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmaWxlVGFncyA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpXG4gICAgICAgICAgICAgICAgPy50YWdzPy5tYXAoKHQpID0+IHQudGFnKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3Muc2VhcmNoZXMuZm9yRWFjaCgoc2VhcmNoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChzZWFyY2gudGFncy5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgICAgZmlsZVRhZ3M/LnNvbWUoKHQpID0+IHNlYXJjaC50YWdzLmNvbnRhaW5zKHQpKSkge1xuICAgICAgICAgICAgICAgIG1lbnUuYWRkSXRlbSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaXRlbS5zZXRUaXRsZShgU2VhcmNoICR7c2VhcmNoLm5hbWV9YCkuc2V0SWNvbignc2VhcmNoJylcbiAgICAgICAgICAgICAgICAgICAgICAub25DbGljaygoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW4ub3BlblNlYXJjaChzZWFyY2gsIGZpbGUuYmFzZW5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KSk7XG5cbiAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgIGlkOiAnc2VhcmNoLW9uLWludGVybmV0JyxcbiAgICAgICAgbmFtZTogJ1BlcmZvcm0gc2VhcmNoJyxcbiAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICBsZXQgcXVlcnkgPSB0aGlzLmdldFNlbGVjdGVkVGV4dCgpO1xuXG4gICAgICAgICAgaWYgKHF1ZXJ5ID09PSBudWxsIHx8IHF1ZXJ5ID09PSAnJykge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlVmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG4gICAgICAgICAgICBpZiAoYWN0aXZlVmlldyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXJ5ID0gYWN0aXZlVmlldy5nZXREaXNwbGF5VGV4dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBtb2RhbCA9IG5ldyBTZWFyY2hNb2RhbChwbHVnaW4uYXBwLCBwbHVnaW4sIHF1ZXJ5KTtcbiAgICAgICAgICBtb2RhbC5vcGVuKCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuXG4gICAgICAvLyBDaGFuZ2luZyB0aGUgY29udGV4dCBtZW51IGlzIGEgYml0IHByb2JsZW1hdGljOlxuICAgICAgLy8gT2JzaWRpYW4gc29tZXRpbWVzIHVzZXMgaXRzIG93biBjb250ZXh0IG1lbnUsIGVnIHdoZW4gcmlnaHQtY2xpY2tpbmdcbiAgICAgIC8vIG9uIGludGVybmFsIGxpbmsuIEJ1dCBvdGhlciB0aW1lcywgaXQncyBhIGNvbnRleHQgbWVudSB0aGF0XG4gICAgICAvLyBjYW5ub3QgcmVhbGx5IGJlIGVkaXRlZCBlYXNpbHkuIEl0IHdvdWxkIGJlIG5pY2UgaWYgT2JzaWRpYW5cbiAgICAgIC8vIHByb3ZpZGVkIGl0cyBvd24gY29udGV4dCBtZW51IGV2ZXJ5d2hlcmUgdG8gaG9vayBpbnRvLlxuXG4gICAgICB0aGlzLnJlZ2lzdGVyQ29kZU1pcnJvcigoY20pID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjbS5yZXNldFNlbGVjdGlvbk9uQ29udGV4dE1lbnU9ZmFsc2U7XG4gICAgICAgIGNtLm9uKCdjb250ZXh0bWVudScsIChlZGl0b3IsIGV2ZW50KT0+e1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVkaXRvcik7XG4gICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICAgIHRoaXMuaGFuZGxlQ29udGV4dChldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5vbignY29udGV4dG1lbnUnLCAnLm1hcmtkb3duLXByZXZpZXctdmlldycsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICAgIHRoaXMuaGFuZGxlQ29udGV4dChldmVudCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZFRleHQoKTogc3RyaW5nIHtcbiAgICAgIGNvbnN0IHdTZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICBjb25zdCBkb2NTZWxlY3Rpb24gPSBkb2N1bWVudD8uZ2V0U2VsZWN0aW9uKCk7XG4gICAgICBpZiAod1NlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gd1NlbGVjdGlvbi50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIGlmIChkb2N1bWVudCAmJiBkb2NTZWxlY3Rpb24udHlwZSAhPSAnQ29udHJvbCcpIHtcbiAgICAgICAgcmV0dXJuIGRvY1NlbGVjdGlvbi50b1N0cmluZygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgYXN5bmMgaGFuZGxlQ29udGV4dChlOiBNb3VzZUV2ZW50LCBhY3RpdmVWaWV3OiBTZWFyY2hWaWV3PW51bGwpIHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5nZXRTZWxlY3RlZFRleHQoKTtcbiAgICAgIGlmIChxdWVyeSA9PT0gbnVsbCB8fCBxdWVyeSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgZmlsZU1lbnUgPSBuZXcgTWVudSgpO1xuICAgICAgZm9yIChjb25zdCBzZXR0aW5nIG9mIHRoaXMuc2V0dGluZ3Muc2VhcmNoZXMpIHtcbiAgICAgICAgZmlsZU1lbnUuYWRkSXRlbSgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uc2V0VGl0bGUoYFNlYXJjaCAke3NldHRpbmcubmFtZX1gKS5zZXRJY29uKCdzZWFyY2gnKVxuICAgICAgICAgICAgICAub25DbGljaygoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuU2VhcmNoKHNldHRpbmcsIHF1ZXJ5LCBhY3RpdmVWaWV3KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZmlsZU1lbnUuc2hvd0F0UG9zaXRpb24oe3g6IGUueCwgeTogZS55fSk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgYXN5bmMgb3BlblNlYXJjaChzZWFyY2g6IFNlYXJjaFNldHRpbmcsIHF1ZXJ5OiBzdHJpbmcsIGFjdGl2ZVZpZXc6IFNlYXJjaFZpZXc9bnVsbCkge1xuICAgICAgY29uc3QgZW5jb2RlZFF1ZXJ5ID0gZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KTtcbiAgICAgIGNvbnN0IHVybCA9IHNlYXJjaC5xdWVyeS5yZXBsYWNlKCd7e3RpdGxlfX0nLCBlbmNvZGVkUXVlcnkpXG4gICAgICAgICAgLnJlcGxhY2UoJ3t7cXVlcnl9fScsIGVuY29kZWRRdWVyeSk7XG4gICAgICBjb25zb2xlLmxvZyhgU09JOiBPcGVuaW5nIFVSTCAke3VybH1gKTtcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLnVzZUlmcmFtZSkge1xuICAgICAgICBpZiAoYWN0aXZlVmlldykge1xuICAgICAgICAgIGFjdGl2ZVZpZXcuZnJhbWUuc2V0QXR0cignc3JjJywgdXJsKTtcbiAgICAgICAgICBhY3RpdmVWaWV3LnVybCA9IHVybDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmdldExlYWYoISh0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3LmdldFZpZXdUeXBlKCkgPT09ICdlbXB0eScpKTtcbiAgICAgICAgICAvLyBjb25zdCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLnNwbGl0QWN0aXZlTGVhZih0aGlzLnNldHRpbmdzLnNwbGl0RGlyZWN0aW9uKTtcbiAgICAgICAgICBjb25zdCB2aWV3ID0gbmV3IFNlYXJjaFZpZXcodGhpcywgbGVhZiwgcXVlcnksIHNlYXJjaC5uYW1lLCB1cmwpO1xuICAgICAgICAgIGF3YWl0IGxlYWYub3Blbih2aWV3KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgb3Blbih1cmwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG9udW5sb2FkKCkge1xuICAgICAgY29uc29sZS5sb2coJ3VubG9hZGluZyBzZWFyY2gtb24taW50ZXJuZXQnKTtcbiAgICB9XG5cbiAgICBhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG4gICAgICBjb25zdCBsb2FkZWRTZXR0aW5ncyA9IGF3YWl0IHRoaXMubG9hZERhdGEoKSBhcyBhbnk7XG4gICAgICBpZiAobG9hZGVkU2V0dGluZ3MgJiYgbG9hZGVkU2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ3NlYXJjaGVzJykpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IGxvYWRlZFNldHRpbmdzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IERFRkFVTFRfU0VUVElORztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBzYXZlU2V0dGluZ3MoKSB7XG4gICAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuICAgIH1cbn1cblxuXG4iXSwibmFtZXMiOlsiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiLCJmcyIsIm9zIiwiaXNEb2NrZXIiLCJyZXF1aXJlJCQwIiwicGF0aCIsImlzV3NsIiwiY2hpbGRQcm9jZXNzIiwiRnV6enlTdWdnZXN0TW9kYWwiLCJJdGVtVmlldyIsIk1hcmtkb3duVmlldyIsIk1lbnUiLCJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxJQUFJO0FBQzdDLFFBQVEsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0JBQStCLENBQUMsQ0FBQztBQUNsRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixnQkFB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
