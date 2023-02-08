import {Skills} from '../interfaces/skills';
import {KindOfAdvantage} from '../enums/heroes-enums';

export abstract class Hero {
    private health: number;
    private heroStory: string;
    private skills: Skills;
    private advantage: KindOfAdvantage;
    private damage: number

    constructor(health: number, heroStory: string, skills: Skills, advantage: KindOfAdvantage, damage: number) {
        this.health = health;
        this.heroStory = heroStory;
        this.skills = skills;
        this.advantage = advantage;
        this.damage = damage;
    }

    getHealth(): number {
        return this.health;
    }
    tellHeroStory(): string {
        return this.heroStory;
    }
    showHeroFeatures(): string {
        return `Health: ${this.health}\n` +
            `Advantage: ${this.advantage}\n` +
            `Kind of attack: ${this.skills.Attack}\n` +
            `Ability: ${this.skills.Ability}`;
    }
    getDamage(): number {
        return this.damage;
    }
    getSkills(): Skills {
        return this.skills;
    }

    attack(health: number): number {
        return health - this.getDamage();
    }
    applyAbility(statuses: number[]): number[] {
        statuses.push(this.getSkills().Ability);
        return statuses;
    }
}

export default Hero;
