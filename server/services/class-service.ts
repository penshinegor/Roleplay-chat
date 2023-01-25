import ClassRepository from '../../database/repositories/class-repository';
import {postgreDB} from '../../database/database';
import {TypeOfAbility, TypeOfAttack} from '../../components/enums/heroes-enums';

const classRepository = new ClassRepository(postgreDB);

class ClassService {
    public async getListOfHeroes() {
        const response = await classRepository.getListOfClasses()
        const list = response.rows;
        list.forEach(hero => {
            if (hero.attack_type === TypeOfAttack.HittingFireSwords && hero.ability === TypeOfAbility.DefensingFromPhysicalDamage) {
                hero.attack_type = 'Hitting fire Swords';
                hero.ability = 'Defensing by shield from physical damage';
            } else if (hero.attack_type === TypeOfAttack.FiringFromTrustyBow && hero.ability === TypeOfAbility.RunningAwayForInvulnerability) {
                hero.attack_type = 'Firing from trusty Bow';
                hero.ability = 'Running away for invulnerability';
            } else {
                hero.attack_type = 'Launching Fireballs';
                hero.ability = 'Hexing the hero';
            }
        });
        return list;
    }
}

export default ClassService;