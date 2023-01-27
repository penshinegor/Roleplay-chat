import {TypeOfHero} from '../../components/enums/heroes-enums';
import DragonWarrior from '../dragon-warrior';
import Thief from '../thief';
import Wizard from '../wizard';
import Hero from '../../components/abstract-classes/hero';

class HeroesProvider {
    public static createHero(typeOfHero: TypeOfHero): Hero {
        if (typeOfHero === TypeOfHero.DragonWarrior) {
            return new DragonWarrior();
        } else if (typeOfHero === TypeOfHero.Thief) {
            return new Thief();
        } else {
            return new Wizard();
        }
    }
}

export default HeroesProvider;