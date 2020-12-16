// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as GenietalkCards from  "genietalkcards";
import { HostContainer } from "../host-container";
import * as hostConfig from "../../hostConfigs/windows-timeline.json";

export class TimelineContainer extends HostContainer {
    public initialize() {
        super.initialize();

        GenietalkCards.GlobalSettings.useMarkdownInRadioButtonAndCheckbox = true;
        GenietalkCards.GlobalSettings.useAdvancedCardBottomTruncation = true;
        GenietalkCards.GlobalSettings.useAdvancedTextBlockTruncation = true;
    }

    public renderTo(hostElement: HTMLElement) {
        let target = document.getElementById("designerHost");
        let frame = document.createElement("div");
        frame.className = "timeline-frame";
        target.appendChild(frame);

        let cardContainer = document.createElement("div");
        cardContainer.className = "timeline-card";
        frame.appendChild(cardContainer);

        this.cardHost.style.height = "100%";
        this.cardHost.style.width = "100%";
        this.cardHost.style.overflow = "hidden";

        cardContainer.appendChild(this.cardHost);
        hostElement.appendChild(frame);
    }

    public getHostConfig(): GenietalkCards.HostConfig {
        return new GenietalkCards.HostConfig(hostConfig);
    }

    get isFixedHeight(): boolean {
        return true;
    }
}
