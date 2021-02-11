'use strict';

var obsidian = require('obsidian');

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

var extendStatics = function(d, b) {
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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

var BetterWordCountSettingsTab = /** @class */ (function (_super) {
    __extends(BetterWordCountSettingsTab, _super);
    function BetterWordCountSettingsTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BetterWordCountSettingsTab.prototype.display = function () {
        var containerEl = this.containerEl;
        var plugin = this.plugin;
        containerEl.empty();
        containerEl.createEl("h2", { text: "Better Word Count Settings" });
        // Word Count Settings
        containerEl.createEl("h3", { text: "Word Count Settings" });
        new obsidian.Setting(containerEl)
            .setName("Show Word Count")
            .setDesc("Enable this to show the word count.")
            .addToggle(function (boolean) {
            return boolean.setValue(plugin.settings.showWords).onChange(function (value) {
                plugin.settings.showWords = value;
                plugin.saveData(plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Word Count Prefix")
            .setDesc("This changes the text in front of the word count number.")
            .addText(function (text) {
            return text.setValue(plugin.settings.wordsPrefix).onChange(function (value) {
                plugin.settings.wordsPrefix = value;
                plugin.saveData(plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Word Count Suffix")
            .setDesc("This changes the text after of the word count number.")
            .addText(function (text) {
            return text.setValue(plugin.settings.wordsSuffix).onChange(function (value) {
                plugin.settings.wordsSuffix = value;
                plugin.saveData(plugin.settings);
            });
        });
        // Character Count Settings
        containerEl.createEl("h3", { text: "Character Count Settings" });
        new obsidian.Setting(containerEl)
            .setName("Show Character Count")
            .setDesc("Enable this to show the character count.")
            .addToggle(function (boolean) {
            return boolean.setValue(plugin.settings.showCharacters).onChange(function (value) {
                plugin.settings.showCharacters = value;
                plugin.saveData(plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Character Count Prefix")
            .setDesc("This changes the text in front of the character count number.")
            .addText(function (text) {
            return text.setValue(plugin.settings.charactersPrefix).onChange(function (value) {
                plugin.settings.charactersPrefix = value;
                plugin.saveData(plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Character Count Suffix")
            .setDesc("This changes the text after of the character count number.")
            .addText(function (text) {
            return text.setValue(plugin.settings.charactersSuffix).onChange(function (value) {
                plugin.settings.charactersSuffix = value;
                plugin.saveData(plugin.settings);
            });
        });
        // Sentence Count Settings
        containerEl.createEl("h3", { text: "Sentence Count Settings" });
        new obsidian.Setting(containerEl)
            .setName("Show Sentence Count")
            .setDesc("Enable this to show the sentence count.")
            .addToggle(function (boolean) {
            return boolean.setValue(plugin.settings.showSentences).onChange(function (value) {
                plugin.settings.showSentences = value;
                plugin.saveData(plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Sentence Count Prefix")
            .setDesc("This changes the text in front of the sentence count number.")
            .addText(function (text) {
            return text.setValue(plugin.settings.sentencesPrefix).onChange(function (value) {
                plugin.settings.sentencesPrefix = value;
                plugin.saveData(plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Sentence Count Suffix")
            .setDesc("This changes the text after of the sentence count number.")
            .addText(function (text) {
            return text.setValue(plugin.settings.sentencesSuffix).onChange(function (value) {
                plugin.settings.sentencesSuffix = value;
                plugin.saveData(plugin.settings);
            });
        });
    };
    return BetterWordCountSettingsTab;
}(obsidian.PluginSettingTab));

var BetterWordCountSettings = /** @class */ (function () {
    function BetterWordCountSettings() {
        this.showWords = true;
        this.wordsPrefix = "";
        this.wordsSuffix = " words ";
        this.showCharacters = true;
        this.charactersPrefix = "";
        this.charactersSuffix = " characters ";
        this.showSentences = false;
        this.sentencesPrefix = "";
        this.sentencesSuffix = " sentences";
    }
    return BetterWordCountSettings;
}());

var StatusBar = /** @class */ (function () {
    function StatusBar(statusBarEl) {
        this.statusBarEl = statusBarEl;
    }
    StatusBar.prototype.displayText = function (text) {
        this.statusBarEl.setText(text);
    };
    return StatusBar;
}());

var BetterWordCount = /** @class */ (function (_super) {
    __extends(BetterWordCount, _super);
    function BetterWordCount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BetterWordCount.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusBarEl, _a, activeLeaf, files;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        statusBarEl = this.addStatusBarItem();
                        this.statusBar = new StatusBar(statusBarEl);
                        this.updateAltCount();
                        this.recentlyTyped = false;
                        _a = this;
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = (_b.sent()) || new BetterWordCountSettings();
                        this.addSettingTab(new BetterWordCountSettingsTab(this.app, this));
                        this.registerEvent(this.app.workspace.on("file-open", this.onFileOpen, this));
                        this.registerEvent(this.app.workspace.on("quick-preview", this.onQuickPreview, this));
                        this.registerInterval(window.setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var activeLeaf, editor, content, contents;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        activeLeaf = this.app.workspace.activeLeaf;
                                        if (!activeLeaf || !(activeLeaf.view instanceof obsidian.MarkdownView)) {
                                            return [2 /*return*/];
                                        }
                                        editor = activeLeaf.view.sourceMode.cmEditor;
                                        if (!editor.somethingSelected()) return [3 /*break*/, 1];
                                        content = editor.getSelection();
                                        this.updateWordCount(content);
                                        this.recentlyTyped = false;
                                        return [3 /*break*/, 4];
                                    case 1:
                                        if (!(this.currentFile &&
                                            this.currentFile.extension === "md" &&
                                            !this.recentlyTyped)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this.app.vault.cachedRead(this.currentFile)];
                                    case 2:
                                        contents = _a.sent();
                                        this.updateWordCount(contents);
                                        return [3 /*break*/, 4];
                                    case 3:
                                        if (!this.recentlyTyped) {
                                            this.updateWordCount("");
                                        }
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }, 500));
                        activeLeaf = this.app.workspace.activeLeaf;
                        files = this.app.vault.getMarkdownFiles();
                        files.forEach(function (file) {
                            if (file.basename === activeLeaf.getDisplayText()) {
                                _this.onFileOpen(file);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    BetterWordCount.prototype.onFileOpen = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var contents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.currentFile = file;
                        if (!(file && file.extension === "md")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.app.vault.cachedRead(file)];
                    case 1:
                        contents = _a.sent();
                        this.recentlyTyped = true;
                        this.updateWordCount(contents);
                        return [3 /*break*/, 3];
                    case 2:
                        this.updateAltCount();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BetterWordCount.prototype.onQuickPreview = function (file, contents) {
        this.currentFile = file;
        var leaf = this.app.workspace.activeLeaf;
        if (leaf && leaf.view.getViewType() === "markdown") {
            this.recentlyTyped = true;
            this.updateWordCount(contents);
        }
    };
    BetterWordCount.prototype.updateAltCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files;
            return __generator(this, function (_a) {
                files = this.app.vault.getFiles().length;
                this.statusBar.displayText(files + " files");
                return [2 /*return*/];
            });
        });
    };
    BetterWordCount.prototype.updateWordCount = function (text) {
        var words = 0;
        var matches = text.match(/[a-zA-Z0-9_\u0392-\u03c9\u00c0-\u00ff\u0600-\u06ff]+|[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/gm);
        if (matches) {
            for (var i = 0; i < matches.length; i++) {
                if (matches[i].charCodeAt(0) > 19968) {
                    words += matches[i].length;
                }
                else {
                    words += 1;
                }
            }
        }
        // Thanks to Extract Highlights plugin and AngelusDomini
        // Also https://stackoverflow.com/questions/5553410
        var sentences = ((text || "").match(/[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/gm) || []).length;
        var displayText = "";
        if (this.settings.showWords) {
            displayText =
                displayText +
                    this.settings.wordsPrefix +
                    words +
                    this.settings.wordsSuffix;
        }
        if (this.settings.showCharacters) {
            displayText =
                displayText +
                    this.settings.charactersPrefix +
                    text.length +
                    this.settings.charactersSuffix;
        }
        if (this.settings.showSentences) {
            displayText =
                displayText +
                    this.settings.sentencesPrefix +
                    sentences +
                    this.settings.sentencesSuffix;
        }
        this.statusBar.displayText(displayText);
    };
    return BetterWordCount;
}(obsidian.Plugin));

module.exports = BetterWordCount;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9zZXR0aW5ncy9zZXR0aW5ncy10YWIudHMiLCIuLi9zcmMvc2V0dGluZ3Mvc2V0dGluZ3MudHMiLCIuLi9zcmMvc3RhdHVzLWJhci50cyIsIi4uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcclxuICAgICAgICB0b1tqXSA9IGZyb21baV07XHJcbiAgICByZXR1cm4gdG87XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSBcImNsdXN0ZXJcIjtcbmltcG9ydCB7IFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBCZXR0ZXJXb3JkQ291bnQgZnJvbSBcIi4uL21haW5cIjtcblxuZXhwb3J0IGNsYXNzIEJldHRlcldvcmRDb3VudFNldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gIGRpc3BsYXkoKTogdm9pZCB7XG4gICAgbGV0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgY29uc3QgcGx1Z2luOiBCZXR0ZXJXb3JkQ291bnQgPSAodGhpcyBhcyBhbnkpLnBsdWdpbjtcblxuICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiQmV0dGVyIFdvcmQgQ291bnQgU2V0dGluZ3NcIiB9KTtcblxuICAgIC8vIFdvcmQgQ291bnQgU2V0dGluZ3NcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJXb3JkIENvdW50IFNldHRpbmdzXCIgfSk7XG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlNob3cgV29yZCBDb3VudFwiKVxuICAgICAgLnNldERlc2MoXCJFbmFibGUgdGhpcyB0byBzaG93IHRoZSB3b3JkIGNvdW50LlwiKVxuICAgICAgLmFkZFRvZ2dsZSgoYm9vbGVhbikgPT5cbiAgICAgICAgYm9vbGVhbi5zZXRWYWx1ZShwbHVnaW4uc2V0dGluZ3Muc2hvd1dvcmRzKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICBwbHVnaW4uc2V0dGluZ3Muc2hvd1dvcmRzID0gdmFsdWU7XG4gICAgICAgICAgcGx1Z2luLnNhdmVEYXRhKHBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJXb3JkIENvdW50IFByZWZpeFwiKVxuICAgICAgLnNldERlc2MoXCJUaGlzIGNoYW5nZXMgdGhlIHRleHQgaW4gZnJvbnQgb2YgdGhlIHdvcmQgY291bnQgbnVtYmVyLlwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHQuc2V0VmFsdWUocGx1Z2luLnNldHRpbmdzLndvcmRzUHJlZml4KS5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICBwbHVnaW4uc2V0dGluZ3Mud29yZHNQcmVmaXggPSB2YWx1ZTtcbiAgICAgICAgICBwbHVnaW4uc2F2ZURhdGEocGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIldvcmQgQ291bnQgU3VmZml4XCIpXG4gICAgICAuc2V0RGVzYyhcIlRoaXMgY2hhbmdlcyB0aGUgdGV4dCBhZnRlciBvZiB0aGUgd29yZCBjb3VudCBudW1iZXIuXCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dC5zZXRWYWx1ZShwbHVnaW4uc2V0dGluZ3Mud29yZHNTdWZmaXgpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHBsdWdpbi5zZXR0aW5ncy53b3Jkc1N1ZmZpeCA9IHZhbHVlO1xuICAgICAgICAgIHBsdWdpbi5zYXZlRGF0YShwbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIC8vIENoYXJhY3RlciBDb3VudCBTZXR0aW5nc1xuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIkNoYXJhY3RlciBDb3VudCBTZXR0aW5nc1wiIH0pO1xuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJTaG93IENoYXJhY3RlciBDb3VudFwiKVxuICAgICAgLnNldERlc2MoXCJFbmFibGUgdGhpcyB0byBzaG93IHRoZSBjaGFyYWN0ZXIgY291bnQuXCIpXG4gICAgICAuYWRkVG9nZ2xlKChib29sZWFuKSA9PlxuICAgICAgICBib29sZWFuLnNldFZhbHVlKHBsdWdpbi5zZXR0aW5ncy5zaG93Q2hhcmFjdGVycykub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgcGx1Z2luLnNldHRpbmdzLnNob3dDaGFyYWN0ZXJzID0gdmFsdWU7XG4gICAgICAgICAgcGx1Z2luLnNhdmVEYXRhKHBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJDaGFyYWN0ZXIgQ291bnQgUHJlZml4XCIpXG4gICAgICAuc2V0RGVzYyhcIlRoaXMgY2hhbmdlcyB0aGUgdGV4dCBpbiBmcm9udCBvZiB0aGUgY2hhcmFjdGVyIGNvdW50IG51bWJlci5cIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0LnNldFZhbHVlKHBsdWdpbi5zZXR0aW5ncy5jaGFyYWN0ZXJzUHJlZml4KS5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICBwbHVnaW4uc2V0dGluZ3MuY2hhcmFjdGVyc1ByZWZpeCA9IHZhbHVlO1xuICAgICAgICAgIHBsdWdpbi5zYXZlRGF0YShwbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiQ2hhcmFjdGVyIENvdW50IFN1ZmZpeFwiKVxuICAgICAgLnNldERlc2MoXCJUaGlzIGNoYW5nZXMgdGhlIHRleHQgYWZ0ZXIgb2YgdGhlIGNoYXJhY3RlciBjb3VudCBudW1iZXIuXCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dC5zZXRWYWx1ZShwbHVnaW4uc2V0dGluZ3MuY2hhcmFjdGVyc1N1ZmZpeCkub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgcGx1Z2luLnNldHRpbmdzLmNoYXJhY3RlcnNTdWZmaXggPSB2YWx1ZTtcbiAgICAgICAgICBwbHVnaW4uc2F2ZURhdGEocGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAvLyBTZW50ZW5jZSBDb3VudCBTZXR0aW5nc1xuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIlNlbnRlbmNlIENvdW50IFNldHRpbmdzXCIgfSk7XG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlNob3cgU2VudGVuY2UgQ291bnRcIilcbiAgICAgIC5zZXREZXNjKFwiRW5hYmxlIHRoaXMgdG8gc2hvdyB0aGUgc2VudGVuY2UgY291bnQuXCIpXG4gICAgICAuYWRkVG9nZ2xlKChib29sZWFuKSA9PlxuICAgICAgICBib29sZWFuLnNldFZhbHVlKHBsdWdpbi5zZXR0aW5ncy5zaG93U2VudGVuY2VzKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICBwbHVnaW4uc2V0dGluZ3Muc2hvd1NlbnRlbmNlcyA9IHZhbHVlO1xuICAgICAgICAgIHBsdWdpbi5zYXZlRGF0YShwbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiU2VudGVuY2UgQ291bnQgUHJlZml4XCIpXG4gICAgICAuc2V0RGVzYyhcIlRoaXMgY2hhbmdlcyB0aGUgdGV4dCBpbiBmcm9udCBvZiB0aGUgc2VudGVuY2UgY291bnQgbnVtYmVyLlwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHQuc2V0VmFsdWUocGx1Z2luLnNldHRpbmdzLnNlbnRlbmNlc1ByZWZpeCkub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgcGx1Z2luLnNldHRpbmdzLnNlbnRlbmNlc1ByZWZpeCA9IHZhbHVlO1xuICAgICAgICAgIHBsdWdpbi5zYXZlRGF0YShwbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiU2VudGVuY2UgQ291bnQgU3VmZml4XCIpXG4gICAgICAuc2V0RGVzYyhcIlRoaXMgY2hhbmdlcyB0aGUgdGV4dCBhZnRlciBvZiB0aGUgc2VudGVuY2UgY291bnQgbnVtYmVyLlwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHQuc2V0VmFsdWUocGx1Z2luLnNldHRpbmdzLnNlbnRlbmNlc1N1ZmZpeCkub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgcGx1Z2luLnNldHRpbmdzLnNlbnRlbmNlc1N1ZmZpeCA9IHZhbHVlO1xuICAgICAgICAgIHBsdWdpbi5zYXZlRGF0YShwbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEJldHRlcldvcmRDb3VudFNldHRpbmdzIHtcbiAgc2hvd1dvcmRzOiBib29sZWFuID0gdHJ1ZTtcbiAgd29yZHNQcmVmaXg6IHN0cmluZyA9IFwiXCI7XG4gIHdvcmRzU3VmZml4OiBzdHJpbmcgPSBcIiB3b3JkcyBcIjtcbiAgc2hvd0NoYXJhY3RlcnM6IGJvb2xlYW4gPSB0cnVlO1xuICBjaGFyYWN0ZXJzUHJlZml4OiBzdHJpbmcgPSBcIlwiO1xuICBjaGFyYWN0ZXJzU3VmZml4OiBzdHJpbmcgPSBcIiBjaGFyYWN0ZXJzIFwiO1xuICBzaG93U2VudGVuY2VzOiBib29sZWFuID0gZmFsc2U7XG4gIHNlbnRlbmNlc1ByZWZpeDogc3RyaW5nID0gXCJcIjtcbiAgc2VudGVuY2VzU3VmZml4OiBzdHJpbmcgPSBcIiBzZW50ZW5jZXNcIjtcbn1cbiIsImV4cG9ydCBjbGFzcyBTdGF0dXNCYXIge1xuICBwcml2YXRlIHN0YXR1c0JhckVsOiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihzdGF0dXNCYXJFbDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLnN0YXR1c0JhckVsID0gc3RhdHVzQmFyRWw7XG4gIH1cblxuICBkaXNwbGF5VGV4dCh0ZXh0OiBzdHJpbmcpIHtcbiAgICB0aGlzLnN0YXR1c0JhckVsLnNldFRleHQodGV4dCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XHJcbiAgTWFya2Rvd25WaWV3LFxyXG4gIFBsdWdpbixcclxuICBURmlsZSxcclxuICBNZXRhZGF0YUNhY2hlLFxyXG4gIGdldEFsbFRhZ3MsXHJcbn0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCB7IEJldHRlcldvcmRDb3VudFNldHRpbmdzVGFiIH0gZnJvbSBcIi4vc2V0dGluZ3Mvc2V0dGluZ3MtdGFiXCI7XHJcbmltcG9ydCB7IEJldHRlcldvcmRDb3VudFNldHRpbmdzIH0gZnJvbSBcIi4vc2V0dGluZ3Mvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU3RhdHVzQmFyIH0gZnJvbSBcIi4vc3RhdHVzLWJhclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmV0dGVyV29yZENvdW50IGV4dGVuZHMgUGx1Z2luIHtcclxuICBwdWJsaWMgcmVjZW50bHlUeXBlZDogYm9vbGVhbjtcclxuICBwdWJsaWMgc3RhdHVzQmFyOiBTdGF0dXNCYXI7XHJcbiAgcHVibGljIGN1cnJlbnRGaWxlOiBURmlsZTtcclxuICBwdWJsaWMgc2V0dGluZ3M6IEJldHRlcldvcmRDb3VudFNldHRpbmdzO1xyXG5cclxuICBhc3luYyBvbmxvYWQoKSB7XHJcbiAgICBsZXQgc3RhdHVzQmFyRWwgPSB0aGlzLmFkZFN0YXR1c0Jhckl0ZW0oKTtcclxuICAgIHRoaXMuc3RhdHVzQmFyID0gbmV3IFN0YXR1c0JhcihzdGF0dXNCYXJFbCk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVBbHRDb3VudCgpO1xyXG5cclxuICAgIHRoaXMucmVjZW50bHlUeXBlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0dGluZ3MgPSAoYXdhaXQgdGhpcy5sb2FkRGF0YSgpKSB8fCBuZXcgQmV0dGVyV29yZENvdW50U2V0dGluZ3MoKTtcclxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgQmV0dGVyV29yZENvdW50U2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXHJcbiAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbihcImZpbGUtb3BlblwiLCB0aGlzLm9uRmlsZU9wZW4sIHRoaXMpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJFdmVudChcclxuICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9uKFwicXVpY2stcHJldmlld1wiLCB0aGlzLm9uUXVpY2tQcmV2aWV3LCB0aGlzKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVySW50ZXJ2YWwoXHJcbiAgICAgIHdpbmRvdy5zZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGFjdGl2ZUxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcclxuXHJcbiAgICAgICAgaWYgKCFhY3RpdmVMZWFmIHx8ICEoYWN0aXZlTGVhZi52aWV3IGluc3RhbmNlb2YgTWFya2Rvd25WaWV3KSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVkaXRvciA9IGFjdGl2ZUxlYWYudmlldy5zb3VyY2VNb2RlLmNtRWRpdG9yO1xyXG4gICAgICAgIGlmIChlZGl0b3Iuc29tZXRoaW5nU2VsZWN0ZWQoKSkge1xyXG4gICAgICAgICAgbGV0IGNvbnRlbnQ6IHN0cmluZyA9IGVkaXRvci5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlV29yZENvdW50KGNvbnRlbnQpO1xyXG4gICAgICAgICAgdGhpcy5yZWNlbnRseVR5cGVkID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgIHRoaXMuY3VycmVudEZpbGUgJiZcclxuICAgICAgICAgIHRoaXMuY3VycmVudEZpbGUuZXh0ZW5zaW9uID09PSBcIm1kXCIgJiZcclxuICAgICAgICAgICF0aGlzLnJlY2VudGx5VHlwZWRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGNvbnN0IGNvbnRlbnRzID0gYXdhaXQgdGhpcy5hcHAudmF1bHQuY2FjaGVkUmVhZCh0aGlzLmN1cnJlbnRGaWxlKTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlV29yZENvdW50KGNvbnRlbnRzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnJlY2VudGx5VHlwZWQpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlV29yZENvdW50KFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgNTAwKVxyXG4gICAgKTtcclxuXHJcbiAgICBsZXQgYWN0aXZlTGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmO1xyXG4gICAgbGV0IGZpbGVzOiBURmlsZVtdID0gdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xyXG5cclxuICAgIGZpbGVzLmZvckVhY2goKGZpbGUpID0+IHtcclxuICAgICAgaWYgKGZpbGUuYmFzZW5hbWUgPT09IGFjdGl2ZUxlYWYuZ2V0RGlzcGxheVRleHQoKSkge1xyXG4gICAgICAgIHRoaXMub25GaWxlT3BlbihmaWxlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvbkZpbGVPcGVuKGZpbGU6IFRGaWxlKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRGaWxlID0gZmlsZTtcclxuICAgIGlmIChmaWxlICYmIGZpbGUuZXh0ZW5zaW9uID09PSBcIm1kXCIpIHtcclxuICAgICAgY29uc3QgY29udGVudHMgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5jYWNoZWRSZWFkKGZpbGUpO1xyXG4gICAgICB0aGlzLnJlY2VudGx5VHlwZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnVwZGF0ZVdvcmRDb3VudChjb250ZW50cyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnVwZGF0ZUFsdENvdW50KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblF1aWNrUHJldmlldyhmaWxlOiBURmlsZSwgY29udGVudHM6IHN0cmluZykge1xyXG4gICAgdGhpcy5jdXJyZW50RmlsZSA9IGZpbGU7XHJcbiAgICBjb25zdCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWY7XHJcblxyXG4gICAgaWYgKGxlYWYgJiYgbGVhZi52aWV3LmdldFZpZXdUeXBlKCkgPT09IFwibWFya2Rvd25cIikge1xyXG4gICAgICB0aGlzLnJlY2VudGx5VHlwZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnVwZGF0ZVdvcmRDb3VudChjb250ZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGRhdGVBbHRDb3VudCgpIHtcclxuICAgIC8vIFRoYW5rcyB0byBFbGVhbm9yIEtvbmlrIGZvciB0aGUgYWx0ZXJuYXRlIGNvdW50IGlkZWEuXHJcbiAgICBjb25zdCBmaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldEZpbGVzKCkubGVuZ3RoO1xyXG5cclxuICAgIHRoaXMuc3RhdHVzQmFyLmRpc3BsYXlUZXh0KGAke2ZpbGVzfSBmaWxlc2ApO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlV29yZENvdW50KHRleHQ6IHN0cmluZykge1xyXG4gICAgbGV0IHdvcmRzOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0IG1hdGNoZXMgPSB0ZXh0Lm1hdGNoKFxyXG4gICAgICAvW2EtekEtWjAtOV9cXHUwMzkyLVxcdTAzYzlcXHUwMGMwLVxcdTAwZmZcXHUwNjAwLVxcdTA2ZmZdK3xbXFx1NGUwMC1cXHU5ZmZmXFx1MzQwMC1cXHU0ZGJmXFx1ZjkwMC1cXHVmYWZmXFx1MzA0MC1cXHUzMDlmXFx1YWMwMC1cXHVkN2FmXSsvZ21cclxuICAgICk7XHJcblxyXG4gICAgaWYgKG1hdGNoZXMpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKG1hdGNoZXNbaV0uY2hhckNvZGVBdCgwKSA+IDE5OTY4KSB7XHJcbiAgICAgICAgICB3b3JkcyArPSBtYXRjaGVzW2ldLmxlbmd0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd29yZHMgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGFua3MgdG8gRXh0cmFjdCBIaWdobGlnaHRzIHBsdWdpbiBhbmQgQW5nZWx1c0RvbWluaVxyXG4gICAgLy8gQWxzbyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTUzNDEwXHJcbiAgICBjb25zdCBzZW50ZW5jZXM6IG51bWJlciA9IChcclxuICAgICAgKHRleHQgfHwgXCJcIikubWF0Y2goXHJcbiAgICAgICAgL1teLiE/XFxzXVteLiE/XSooPzpbLiE/XSg/IVsnXCJdP1xcc3wkKVteLiE/XSopKlsuIT9dP1snXCJdPyg/PVxcc3wkKS9nbVxyXG4gICAgICApIHx8IFtdXHJcbiAgICApLmxlbmd0aDtcclxuXHJcbiAgICBsZXQgZGlzcGxheVRleHQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5zaG93V29yZHMpIHtcclxuICAgICAgZGlzcGxheVRleHQgPVxyXG4gICAgICAgIGRpc3BsYXlUZXh0ICtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLndvcmRzUHJlZml4ICtcclxuICAgICAgICB3b3JkcyArXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy53b3Jkc1N1ZmZpeDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dDaGFyYWN0ZXJzKSB7XHJcbiAgICAgIGRpc3BsYXlUZXh0ID1cclxuICAgICAgICBkaXNwbGF5VGV4dCArXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5jaGFyYWN0ZXJzUHJlZml4ICtcclxuICAgICAgICB0ZXh0Lmxlbmd0aCArXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5jaGFyYWN0ZXJzU3VmZml4O1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd1NlbnRlbmNlcykge1xyXG4gICAgICBkaXNwbGF5VGV4dCA9XHJcbiAgICAgICAgZGlzcGxheVRleHQgK1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc2VudGVuY2VzUHJlZml4ICtcclxuICAgICAgICBzZW50ZW5jZXMgK1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc2VudGVuY2VzU3VmZml4O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RhdHVzQmFyLmRpc3BsYXlUZXh0KGRpc3BsYXlUZXh0KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIiwiTWFya2Rvd25WaWV3IiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxJQUFJO0FBQzdDLFFBQVEsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0JBQStCLENBQUMsQ0FBQztBQUNsRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtBQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQjtBQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3pGLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDdkYsb0JBQW9CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FB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
