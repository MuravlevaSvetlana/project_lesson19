import { ENV } from '../config/env';
import { Http } from '../core/http.service';

export class WinnersService {
    constructor() {}

    getWinners() {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/winners?part=1&limit=10`)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }

    getWinnersImages(winners) {
        let images = [];
        for (let i = 0; i < winners.winners.length; i++){
            images.push(winners.winners[i].member_id.images[0].image_basic.url)
        }
        return images;  
    }
}

