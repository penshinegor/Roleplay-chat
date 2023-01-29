# Role-playing game with dynamic chat

Application built on base [NodeJS](https://nodejs.org/en/) with using [TypeScript](https://www.typescriptlang.org/), [Express](https://expressjs.com/), [WebSocket](https://javascript.info/websocket), [PostgreSQL](https://www.postgresql.org/), [MongoDB](https://www.mongodb.com/), [Redis](https://redis.io/) and other helped library. For interact with application, use [Postman](https://www.postman.com/).

## What is this?

Chat provides access to a simulated role play. The user registers and selects any of the proposed classes. Then he gets access to the general chat, where he can interact with other users at any time, available from those available for the user class.
There are no goals in the game, but the player can reduce the health of other players by attack or just apply abilities. a depleted player cannot act, but can respawn with full health at any time.
The same way, it is possible to exchange regular messages, which are also displayed to all users.

## Installation

Use the CLI to install app.

```bash
git pull https://github.com/penshinegor/StudentsProject-ITOMYCH-NodeJS
```
Pulling this project adds a runnable application into your directory. You can start app by `npm run start` cli-command, but you need to get special *.env* file to connect to database and other private actions. So you have to write me on e-mail *pensinegor@gmail.com* to get this file.

## What is required

Also you need, that in your computer was installed:
- NodeJS
- PostgreSQL
- MongoDB
- Redis

and
- Postman (for interact with the application)

All links provided above. So messages are sent only in json format.

## Available heroes

1. Dragon Warrior

![Dragon Warrior](https://user-images.githubusercontent.com/101875465/215324974-5a64d3d0-f821-4b61-bd71-34bda944318b.jpg)

### History

> As Sir Davion slew Slyrak in arranged combat, the Eldwurm's blood mingled with his own, sealing their essences together. He was no longer a dragon-slayer, but a Dragon Warrior. The infusion of Dragon Blood caused his wounds to heal with inhuman speed. While nowhere as grand as Slyrak, he found himself with the ability to hitting fire swords and defencing from physical damage.

### Feature

![Warrior feature](https://user-images.githubusercontent.com/101875465/215327794-035b1f21-13a5-49ae-aa62-1e3c72aa5d1d.png)

2. Thief

![Thief](https://user-images.githubusercontent.com/101875465/215325427-e6f19ece-4f5a-4baf-ba67-367ccb34fb7a.jpg)

### History

> Fear is the mother of rumor, and tales of Gondar\'s origins are nothing but hearsay. For the right price, the Thief will Track down any target to steal something and collect their bounties. He Walks through Shadows into the best guarded keeps, and steal some of their riches and run away. Even targets at a greater distance are not safe from the Thief, as his trusty Bow seemingly has a mind on its own, seeking out and striking all targets the Thief keeps track of.

### Feature

![Thief feature](https://user-images.githubusercontent.com/101875465/215328321-fe414c48-df10-46d9-8c71-b20b45c346c8.png)

3. Wizard

![Wizard](https://user-images.githubusercontent.com/101875465/215325636-5e8bed85-a986-4efb-a478-012e9bdade7f.jpg)

### History

> Carl the Wizard is the one of the few remaining magicians who still practices the ancient sorcery of Invoke, allowing him to harness not one, but all three elements of Quas, Wex, and Exort as well any magic he deigns to learn through sheer will, intelligence, and memory.

### Feature

![Thief feature](https://user-images.githubusercontent.com/101875465/215329653-de1c8c47-4ae7-446e-8f19-f41aa4aa6834.png)

## Cooperation

Pull requests are welcome. If you find that can improve or want to give feedback, you can write me on e-mail, which said above.

Have a nice day!!!
