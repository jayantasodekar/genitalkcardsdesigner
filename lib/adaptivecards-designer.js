"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMicrosoftHosts = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var containers = require("./containers");
__exportStar(require("./adaptivecards-designer-standalone"), exports);
__exportStar(require("./containers/index"), exports);
exports.defaultMicrosoftHosts = [
    new containers.WebChatContainer("Bot Framework WebChat", "containers/webchat-container.css"),
    new containers.OutlookContainer("Outlook Actionable Messages", "containers/outlook-container.css"),
    new containers.DarkTeamsContainer("Microsoft Teams - Dark", "containers/teams-container-dark.css"),
    new containers.LightTeamsContainer("Microsoft Teams - Light", "containers/teams-container-light.css"),
    new containers.DarkCortanaContainer("Cortana Skills - Dark", "containers/cortana-container-dark.css"),
    new containers.LightCortanaContainer("Cortana Skills - Light", "containers/cortana-container-light.css"),
    new containers.TimelineContainer("Windows Timeline", "containers/timeline-container.css"),
    new containers.BotFrameworkContainer("Bot Framework Other Channels (Image render)", "containers/bf-image-container.css"),
    new containers.CortanaClassicContainer("Cortana Skills (Classic)", "containers/cortana-classic-container.css"),
    new containers.ToastContainer("Windows Notifications (Preview)", "containers/toast-container.css"),
];
//# sourceMappingURL=adaptivecards-designer.js.map