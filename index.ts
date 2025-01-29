/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

import { MusicBeeRequest } from "./native";
import { logger } from "./utils";

let updated: boolean = false;

export default definePlugin({
    name: "MusicBee Together",
    description: "Adds a Listen Together button on the MusicBee activity",
    authors: [{ name: "BloodLantern", id: 256003154045435906n }, { name: "YohannDR", id: 418445860028940289n }],

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

            const { activity } = param;

            logger.info("Received local activity update for " + activity.name);

            if (activity.name !== "MusicBee")
                return;

            logger.info("Activity comes from MusicBee, requesting current track");

            activity.buttons = [
                "Button1",
                "Button2"
            ];

            MusicBeeRequest(activity);
        },
    }
});
