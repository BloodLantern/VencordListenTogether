/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { RestAPI } from "@webpack/common";

import { Activity, logger, musicBeeBaseUrl } from "./utils";

export async function MusicBeeRequest(activity: Activity) {
    logger.info("Native function called with args: " + activity);

    const data = await RestAPI.get({ url: musicBeeBaseUrl + "currenttrack" })
        .catch(function (error) {
            logger.error(error);
        });

    logger.info("Received GET request result: " + data);

    // activity.metadata = {
    //     button_urls: [
    //         data,
    //         "https://discord.com"
    //     ]
    // };

    // logger.info("Callback called");
    // logger.info(activity);
    // logger.info(activity.name);

    // updated = true;

    // FluxDispatcher.dispatch({
    //     type: "LOCAL_ACTIVITY_UPDATE",
    //     activity,
    //     socketId: "MusicBee",
    // });
}
