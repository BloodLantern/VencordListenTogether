/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "@utils/Logger";
import definePlugin from "@utils/types";
import { RestAPI } from "@webpack/common";

export interface ActivityAssets {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
}

export const enum ActivityType {
    PLAYING = 0,
    STREAMING = 1,
    LISTENING = 2,
    WATCHING = 3,
    COMPETING = 5
}

export interface Activity {
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

export const logger = new Logger("MusicBeeListenTogether");

export const musicBeePort = 9696;
export const musicBeeBaseUrl = `http://localhost:${musicBeePort}/musicbee/`;

export default definePlugin({
    name: "MusicBeeListenTogether",
    description: "Adds a Listen Together button on the MusicBee activity",
    authors: [{ name: "BloodLantern", id: 256003154045435906n }, { name: "YohannDR", id: 418445860028940289n }],

    flux: {
        LOCAL_ACTIVITY_UPDATE(param: any | null | undefined) {
            if (param === null || param === undefined)
                return;
            if (param.activity === null || param.activity === undefined)
                return;

            const { activity } = param;

            if (activity.name !== "MusicBee")
                return;

            logger.info("Received local activity update for MusicBee, requesting current track");

            handleRequest();
        },
    }
});

async function handleRequest() {
    await RestAPI.get({ url: musicBeeBaseUrl + "currenttrack" })
        .then(function (res) {
            logger.info("Received response: " + res);
        })
        .catch(function (error) {
            logger.error(error);
        });
}

