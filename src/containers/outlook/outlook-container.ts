// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as GenietalkCards from  "genietalkcards";
import { HostContainer } from "../host-container";
import * as hostConfig from "../../hostConfigs/outlook-desktop.json";

export class OutlookContainer extends HostContainer {
    constructor(name: string, styleSheet: string) {
        super(name, styleSheet);

        this.actionsRegistry.unregister("Action.Submit");
        this.actionsRegistry.register("Action.Http", GenietalkCards.HttpAction);
    }

    public renderTo(hostElement: HTMLElement) {
        hostElement.classList.add("outlook-frame");
        hostElement.appendChild(this.cardHost);
    }

    public initialize() {
        super.initialize();

        GenietalkCards.GlobalSettings.useMarkdownInRadioButtonAndCheckbox = false;
    }

    private parsePadding(source: any): GenietalkCards.PaddingDefinition {
        if (source) {
            if (typeof source === "string") {
                var uniformPadding = GenietalkCards.parseEnum(GenietalkCards.Spacing, source, GenietalkCards.Spacing.None);

                return new GenietalkCards.PaddingDefinition(
                    uniformPadding,
                    uniformPadding,
                    uniformPadding,
                    uniformPadding);
            }
            else if (typeof source === "object") {
                return new GenietalkCards.PaddingDefinition(
                    GenietalkCards.parseEnum(GenietalkCards.Spacing, source["top"], GenietalkCards.Spacing.None),
                    GenietalkCards.parseEnum(GenietalkCards.Spacing, source["right"], GenietalkCards.Spacing.None),
                    GenietalkCards.parseEnum(GenietalkCards.Spacing, source["bottom"], GenietalkCards.Spacing.None),
                    GenietalkCards.parseEnum(GenietalkCards.Spacing, source["left"], GenietalkCards.Spacing.None));
            }
        }

        return null;
    }

    public parseElement(element: GenietalkCards.CardElement, source: any, context: GenietalkCards.SerializationContext) {
        if (element instanceof GenietalkCards.Container && typeof source["rtl"] === "boolean") {
            element.rtl = source["rtl"];
        }

        if (element instanceof GenietalkCards.AdaptiveCard) {
            var card = <GenietalkCards.AdaptiveCard>element;
            var actionArray: Array<GenietalkCards.Action> = [];

            card["resources"] = { actions: actionArray };

            if (typeof source["resources"] === "object") {
                var actionResources = source["resources"]["actions"] as Array<any>;

                for (var i = 0; i < actionResources.length; i++) {
                    let action = this.actionsRegistry.createInstance(actionResources[i]["type"], context.targetVersion);

                    if (action) {
                        action.parse(actionResources[i], context);
                        action.setParent(card);

                        actionArray.push(action);
                    }
                }
            }
        }

        if (element instanceof GenietalkCards.Image) {
            (<GenietalkCards.Image>element).backgroundColor = source["backgroundColor"];
        }

        if (element instanceof GenietalkCards.Container) {
            var padding = this.parsePadding(source["padding"]);

            if (padding) {
                (<GenietalkCards.Container>element).padding = padding;
            }
        }

        if (element instanceof GenietalkCards.ColumnSet) {
            var padding = this.parsePadding(source["padding"]);

            if (padding) {
                (<GenietalkCards.ColumnSet>element).padding = padding;
            }
        }
    }

    public anchorClicked(element: GenietalkCards.CardElement, anchor: HTMLAnchorElement): boolean {
        var regEx = /^action:([a-z0-9]+)$/ig;
        var rootCard = element.getRootElement() as GenietalkCards.AdaptiveCard;
        var matches = regEx.exec(anchor.href);

        if (matches) {
            var actionId = matches[1];

            if (rootCard) {
                var actionArray = rootCard["resources"]["actions"] as Array<GenietalkCards.Action>;

                for (var i = 0; i < actionArray.length; i++) {
                    if (actionArray[i].id == actionId) {
                        actionArray[i].execute();

                        return true;
                    }
                }
            }
        }

        return false;
    }

    public getHostConfig(): GenietalkCards.HostConfig {
        return new GenietalkCards.HostConfig(hostConfig);
    }
}
