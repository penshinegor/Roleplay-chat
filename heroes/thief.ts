import {KindOfAdvantage, TypeOfAbility, TypeOfAttack} from '../components/enums/heroes-enums';
import {Hero} from '../components/abstract-classes/hero';

const HISTORY_OF_THIEF = 'Fear is the mother of rumor, and tales of Gondar\'s origins are nothing but hearsay. ' +
    'For the right price, the Thief will Track down any target to steal something and collect their bounties. ' +
    'He Walks through Shadows into the best guarded keeps, and steal some of their riches and run away. ' +
    'Even targets at a greater distance are not safe from the Thief, as his trusty Bow seemingly has a mind on its own, ' +
    'seeking out and striking all targets the Thief keeps track of.'

class Thief extends Hero {
    constructor() {
        super(
            100,
            HISTORY_OF_THIEF,
            { Attack: TypeOfAttack.FiringFromTrustyBow, Ability: TypeOfAbility.RunningAwayForInvulnerability },
            KindOfAdvantage.Agility,
            25
        )
    }
}

export default Thief;