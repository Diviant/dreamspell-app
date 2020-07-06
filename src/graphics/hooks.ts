import { useContext, useEffect, useMemo } from "react";
import * as g from 'dreamspell-math';
import { AppContext } from "../Context/AppContextProvider";
import { initGraphics } from "graphics/loader";
import { DreamDate } from "dreamspell-math";
import env from "env";
import { GraphicOptions, GraphicRef, GraphicTheme } from "consts/GraphicTheme";


export function useSelDate() {
    const context = useContext(AppContext)!;
    return context?.gdate ?? new DreamDate(new Date())
}


export function useTheme() {
    const context = useContext(AppContext);
    const theme = context?.theme ?? env.defaultTheme;
    return theme;
}

export function useGraphics() {
    const theme = useTheme();
    const graphics = useMemo(() => initGraphics(theme), [theme]);
    return graphics;
}
export function useKin(kin: g.Kin, opt?: GraphicOptions) {
    const theme = useTheme();
    const graphics = getGraphics(kin, theme, opt);
    return { graphics };
}


export function useGdate(gdate: g.DreamDate, opt?: GraphicOptions) {
    const theme = useTheme();
    const graphics = getGraphics(gdate.kin, theme, opt);
    return graphics;
}

export const applyGraphicOptions = (gr: GraphicRef, opt?: GraphicOptions) => {
    const src = opt?.active ? gr.active : (gr.inactive ?? gr.active);
    return src;
}

export const getGraphics = (kin: g.Kin, theme: GraphicTheme, opt?: GraphicOptions): {
    sign: any,
    tone: any,
    kin?: any
} => {
    const graphics = initGraphics(theme);
    return {
        sign: applyGraphicOptions(graphics.getSign(kin.sign), opt),
        tone: applyGraphicOptions(graphics.getTone(kin.tone), opt),
        kin: graphics.getKin && applyGraphicOptions(graphics.getKin(kin), opt)
    };
}