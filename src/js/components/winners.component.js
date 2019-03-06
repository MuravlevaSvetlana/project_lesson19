import { WinnersService } from '../services/winners.service';
import { ActiveRoute } from '../core/active-route.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


export class WinnersComponent {
    constructor() {
        this._winnersService = new WinnersService();
        this._activeRoute = new ActiveRoute();
        this._authService = new AuthService();
        this._userService = new UserService();
        this._winners;
        this._images;
        this._user;

    }

    async beforeRender() {
        this._user = await this._userService.getUser(this._authService.userId);
        this._winners = await this._winnersService.getWinners();
        this._images = await this._winnersService.getWinnersImages(this._winners);
        this._imagesTemplate = this._images.map((image) => this.singleImageRender(image));
    }

    render() {
        return `
            <!-- Component styles -->
            <style>
                ${this._style()}
            </style>
            <!-- Component html -->
            <div class="user-cover-container"
                style="background: url(${this._user.cover}) no-repeat center / cover;"
            >
            </div>
            <div class ="container_winners">
            ${this._imagesTemplate.join('')}
            </div>
        `
    }

    singleImageRender(image) {
        return `
            <div class ="image_winner">
                <img src ="${image}" alt ="photo - winner">
            </div>
       `
    }

    _style() {
    return `
        * {
            box-sizing: border-box;
        }

        .user-cover-container {
            height: 400px;
            width: 100%;
        }

        .container_winners {
            max-width: 1133px;
            display: flex;
            flex-wrap: wrap;
            margin-left: auto;
            margin-right: auto;
            margin-top: 20px;
        }

        .image_winner {
            max-width: 250px;
            height: 300px;
            margin: 2px;
            flex-grow:1;
            overflow: hidden;
        }

        .image_winner img {
            width: 100%;
            height: 100%;
        }
    `
    }

    afterRender() {

    }
}