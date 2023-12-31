// Vendor
import React from "react";

import * as g from "dreamspell-math";

// Internal
import "./styles.scss";
import { DreamDate } from "dreamspell-math";
import WaveSpell from "Visuals/WaveSpell/WaveSpell";
import { Kin } from "graphics";

// Setup

/**
 * @class WaveSpellPage
 * @description Brief description
 */

const WaveSpellPage = (props: {
  gdate: g.DreamDate;
}) => {

  const selKin = props.gdate.kin;
  const selDate = props.gdate;
  // todo: use getWavespell from math
  let wavespellStart = g.dreamdate(
    selDate.moment.clone().add(-(selKin.tone.number - 1), "d")
  );


  var selStyle = (props: { kin: g.Kin }) =>
    props.kin.number === selDate.kin.number ? " selected" : "";
  var portalStyle = (props: { kin: g.Kin }) =>
    props.kin.isGalacticPortal ? " portal" : "";
  var mysticStyle = (props: { kin: g.Kin }) =>
    props.kin.isMysticColumn ? " mystic" : "";


  return (
    <div className="wave-spell-page px-4 py-2">
      <h2>Волновой Модуль</h2>

      <WaveSpell
        from={wavespellStart}
        itemClassName="my-2 mx-2"
        iterator={(gdate: DreamDate) =>
          g.dreamdate(gdate.moment.clone().add(1, "d"))
        }
        render={i => (
          <div
            className={
              "wave-cell chromatic" +
              i.kin.color +
              selStyle(i) +
              portalStyle(i) +
              mysticStyle(i)
            }>
            {/* <SignTone {...this.props} tone={props.tone} /> */}
            <Kin kin={i.kin} opt={{
              active: i.kin.number === selDate.kin.number,
              inactive: i.kin.number !== selDate.kin.number
            }} />
          </div>
        )}
      />
    </div>
  );
}


export default WaveSpellPage;
