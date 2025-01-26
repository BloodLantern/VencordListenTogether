/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "@utils/Logger";
import definePlugin from "@utils/types";
import { FluxDispatcher } from "@webpack/common";

interface ActivityAssets {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
}

const enum ActivityType {
    PLAYING = 0,
    STREAMING = 1,
    LISTENING = 2,
    WATCHING = 3,
    COMPETING = 5
}

const enum TimestampMode {
    NONE,
    NOW,
    TIME,
    CUSTOM,
}

interface Activity {
    state?: string;
    details?: string;
    timestamps?: {
        start?: number;
        end?: number;
    };
    assets?: ActivityAssets;
    buttons?: Array<string>;
    name: string;
    application_id: string;
    metadata?: {
        button_urls?: Array<string>;
    };
    type: ActivityType;
    url?: string;
    flags: number;
}

let updated: boolean = false;
const pluginName = "MusicBee Listen Together";

export default definePlugin({
    name: pluginName,
    description: "Adds a Listen Together button on the MusicBee activity",
    authors: [{ name: "BloodLantern", id: 1n }, { name: "YohannDR", id: 2n }],

    flux: {
        LOCAL_ACTIVITY_UPDATE(param: any | null | undefined) {
            if (updated) {
                updated = false;
                return;
            }

            if (param === null || param === undefined)
                return;
            if (param.activity === null || param.activity === undefined)
                return;

            const logger: Logger = new Logger(pluginName);

            const { activity } = param;

            activity.buttons = [
                "Button1",
                "Button2"
            ];
            activity.metadata = {
                button_urls: [
                    "https://google.com",
                    "https://discord.com"
                ]
            };

            logger.info(activity);
            logger.info(activity.name);

            updated = true;

            FluxDispatcher.dispatch({
                type: "LOCAL_ACTIVITY_UPDATE",
                activity,
                socketId: "MusicBee",
            });
        },
    }
});
