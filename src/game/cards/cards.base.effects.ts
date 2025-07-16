import type { CardEffectRegistry } from "../engine/cards/cardEffectsRegistry";
import { BANG } from "./effects/base/bang";
import { MISSED } from "./effects/base/missed";
import { BEER } from "./effects/base/beer";
import { GATLING } from "./effects/base/gatling";
import { DUEL } from "./effects/base/duel";
import { GENERAL_STORE } from "./effects/base/general_store";
import { SALOON } from "./effects/base/saloon";
import { STAGECOACH } from "./effects/base/stagecoach";
import { WELLS_FARGO } from "./effects/base/wells_fargo";
import { PANIC } from "./effects/base/panic";
import { CAT_BALOU } from "./effects/base/cat_balou";
import { INDIANS } from "./effects/base/indians";
import { VOLCANIC } from "./effects/base/volcanic";
import { SCHOFIELD } from "./effects/base/schofield";
import { REMINGTON } from "./effects/base/remington";
import { CARABINE } from "./effects/base/carabine";
import { WINCHESTER } from "./effects/base/winchester";
import { BARREL } from "./effects/base/barrel";
import { SCOPE } from "./effects/base/scope";
import { MUSTANG } from "./effects/base/mustang";

export default {
  BANG,
  MISSED,
  BEER,
  GATLING,
  DUEL,
  GENERAL_STORE,
  SALOON,
  STAGECOACH,
  WELLS_FARGO,
  PANIC,
  CAT_BALOU,
  INDIANS,
  VOLCANIC,
  SCHOFIELD,
  REMINGTON,
  CARABINE,
  WINCHESTER,
  BARREL,
  SCOPE,
  MUSTANG,
} satisfies CardEffectRegistry;
