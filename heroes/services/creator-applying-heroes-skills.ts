import {TypeOfHero} from '../../components/enums/heroes-enums';
import HeroesProvider from './heroes-provider';

class CreatorApplyingHeroesSkills {
    public async applyAbility(typeOfHero: TypeOfHero, session, mongoRepository, idOfAimUser) {
        const hero = HeroesProvider.createHero(typeOfHero);
        session.statuses = hero.applyAbility(session.statuses);
        await session.save();
        setTimeout(async () => {
            session = await mongoRepository.getUserSessionById(idOfAimUser);
            if (!session) {
                return;
            }
            session.statuses.forEach((status, index) => {
                if (status === hero.getSkills().Ability) {
                    session.statuses.splice(index, 1);
                    return;
                }
            })
            await session.save();
        }, 30000);
    }

    public async applyAttack(typeOfHero: TypeOfHero, session) {
        const hero = HeroesProvider.createHero(typeOfHero);
        if (session.hp < hero.getDamage()) {
            session.hp = 0;
            await session.save();
            return;
        }
        session.hp = hero.attack(session.hp);
        await session.save();
    }
}

export default CreatorApplyingHeroesSkills;