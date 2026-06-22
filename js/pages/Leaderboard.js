import { fetchLeaderboard } from '../content.js';
import { localize } from '../util.js';

import Spinner from '../components/Spinner.js';

export default {
    components: {
        Spinner,
    },
    data: () => ({
        leaderboard: [],
        loading: true,
        selected: 0,
        err: [],
    }),
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-leaderboard-container">
            <div class="page-leaderboard">
                <div class="error-container">
                    <p class="error" v-if="err.length > 0">
                        Leaderboard may be incorrect, as the following levels could not be loaded: {{ err.join(', ') }}
                    </p>
                </div>
                <div class="board-container">
                    <table class="board">
                        <tr v-for="(ientry, i) in leaderboard">
                            <td class="rank">
                                <p class="type-label-lg">#{{ i + 1 }}</p>
                            </td>
                            <td class="total">
                                <p class="type-label-lg">{{ localize(ientry.total) }}</p>
                            </td>
                            <td class="user" :class="{ 'active': selected == i }">
                                <button @click="selected = i">
                                    <span class="type-label-lg">{{ ientry.user }}</span>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="player-container">
                    <div class="player">
                        <h1>#{{ selected + 1 }} {{ entry.user }}</h1>
                        <h3>{{ entry.total }}</h3>
                        <h2 v-if="entry.verified.length > 0">Verified ({{ entry.verified.length}})</h2>
                        <table class="table">
                            <tr v-for="score in entry.verified">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" class="level" :class="{ 
                        'amethyst': score.rank <= 1 , 
                        'pearl': (score.rank >= 2) && (score.rank <= 4) , 
                        'diamond': (score.rank >= 5) && (score.rank <= 17) , 
                        'ruby': (score.rank >= 18) && (score.rank <= 38) , 
                        'emerald': (score.rank >= 39) && (score.rank <= 65) , 
                        'jade': (score.rank >= 66) && (score.rank <= 84) , 
                        'malachite': (score.rank >= 85) && (score.rank <= 98) , 
                        'osmium': (score.rank >= 99) && (score.rank <= 112) ,
                        'sapphire': (score.rank >= 113) && (score.rank <= 139) , 
                        'titanium': (score.rank >= 140) && (score.rank <= 152) ,
                        'platinum': (score.rank >= 153) && (score.rank <= 173) , 
                        'amber': (score.rank >= 174) && (score.rank <= 200) , 
                        'gold': (score.rank >= 201) && (score.rank <= 224) , 
                        'silver': (score.rank >= 225) && (score.rank <= 240) , 
                        'bronze': (score.rank >= 241) && (score.rank <= 267) , 
                        'beginner': (score.rank >= 268) && (score.rank <= 284) , 
                        'wood': (score.rank >= 285)}"  target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                        <h2 v-if="entry.completed.length > 0">Completed ({{ entry.completed.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.completed">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" class="level" :class="{ 
                        'pearl': score.rank <= 4 , 
                        'diamond': (score.rank >= 5) && (score.rank <= 17) , 
                        'ruby': (score.rank >= 18) && (score.rank <= 38) , 
                        'emerald': (score.rank >= 39) && (score.rank <= 65) , 
                        'jade': (score.rank >= 66) && (score.rank <= 84) , 
                        'malachite': (score.rank >= 85) && (score.rank <= 98) , 
                        'osmium': (score.rank >= 99) && (score.rank <= 112) ,
                        'sapphire': (score.rank >= 113) && (score.rank <= 139) , 
                        'titanium': (score.rank >= 140) && (score.rank <= 152) ,
                        'platinum': (score.rank >= 153) && (score.rank <= 173) , 
                        'amber': (score.rank >= 174) && (score.rank <= 200) , 
                        'gold': (score.rank >= 201) && (score.rank <= 224) , 
                        'silver': (score.rank >= 225) && (score.rank <= 240) , 
                        'bronze': (score.rank >= 241) && (score.rank <= 267) , 
                        'beginner': (score.rank >= 268) && (score.rank <= 283) , 
                        'wood': (score.rank >= 284)}"  target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                        <h2 v-if="entry.progressed.length > 0">Progressed ({{entry.progressed.length}})</h2>
                        <table class="table">
                            <tr v-for="score in entry.progressed">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" class="level" :class="{ 
                        'pearl': score.rank <= 4 , 
                        'diamond': (score.rank >= 5) && (score.rank <= 17) , 
                        'ruby': (score.rank >= 18) && (score.rank <= 38) , 
                        'emerald': (score.rank >= 39) && (score.rank <= 65) , 
                        'jade': (score.rank >= 66) && (score.rank <= 84) , 
                        'malachite': (score.rank >= 85) && (score.rank <= 98) , 
                        'osmium': (score.rank >= 99) && (score.rank <= 112) ,
                        'sapphire': (score.rank >= 113) && (score.rank <= 139) , 
                        'titanium': (score.rank >= 140) && (score.rank <= 152) ,
                        'platinum': (score.rank >= 153) && (score.rank <= 173) , 
                        'amber': (score.rank >= 174) && (score.rank <= 200) , 
                        'gold': (score.rank >= 201) && (score.rank <= 224) , 
                        'silver': (score.rank >= 225) && (score.rank <= 240) , 
                        'bronze': (score.rank >= 241) && (score.rank <= 267) , 
                        'beginner': (score.rank >= 268) && (score.rank <= 283) , 
                        'wood': (score.rank >= 284)}" target="_blank" :href="score.link">{{ score.percent }}% {{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    `,
    computed: {
        entry() {
            return this.leaderboard[this.selected];
        },
    },
    async mounted() {
        const [leaderboard, err] = await fetchLeaderboard();
        this.leaderboard = leaderboard;
        this.err = err;
        // Hide loading spinner
        this.loading = false;
    },
    methods: {
        localize,
    },
};
