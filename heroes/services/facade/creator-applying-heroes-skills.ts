import {TypeOfHero} from '../../../components/enums/heroes-enums';
import HeroesProvider from '../provider/heroes-provider';

class CreatorApplyingHeroesSkills {
    public applyAbility(typeOfHero: TypeOfHero) {
        HeroesProvider.createHero(typeOfHero).applyAbility();
    }

    public applyAttack(typeOfHero: TypeOfHero) {
        HeroesProvider.createHero(typeOfHero).attack();
    }
}