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
                        'amethyst': score.rank <= 2 , 
                        'pearl': (score.rank >= 3) && (score.rank <= 8) , 
                        'diamond': (score.rank >= 9) && (score.rank <= 21) , 
                        'ruby': (score.rank >= 22) && (score.rank <= 50) , 
                        'emerald': (score.rank >= 51) && (score.rank <= 84) , 
                        'jade': (score.rank >= 85) && (score.rank <= 104) , 
                        'malachite': (score.rank >= 105) && (score.rank <= 120) , 
                        'osmium': (score.rank >= 121) && (score.rank <= 136) ,
                        'sapphire': (score.rank >= 137) && (score.rank <= 164) , 
                        'titanium': (score.rank >= 165) && (score.rank <= 177) ,
                        'platinum': (score.rank >= 178) && (score.rank <= 200) , 
                        'amber': (score.rank >= 201) && (score.rank <= 234) , 
                        'gold': (score.rank >= 235) && (score.rank <= 263) , 
                        'silver': (score.rank >= 264) && (score.rank <= 289) , 
                        'bronze': (score.rank >= 290) && (score.rank <= 318) , 
                        'beginner': (score.rank >= 319) && (score.rank <= 346) , 
                        'wood': (score.rank >= 347)}"  target="_blank" :href="score.link">{{ score.level }}</a>
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
                        'amethyst': score.rank <= 2 , 
                        'pearl': (score.rank >= 3) && (score.rank <= 8) , 
                        'diamond': (score.rank >= 9) && (score.rank <= 21) , 
                        'ruby': (score.rank >= 22) && (score.rank <= 50) , 
                        'emerald': (score.rank >= 51) && (score.rank <= 84) , 
                        'jade': (score.rank >= 85) && (score.rank <= 103) , 
                        'malachite': (score.rank >= 104) && (score.rank <= 119) , 
                        'osmium': (score.rank >= 120) && (score.rank <= 135) ,
                        'sapphire': (score.rank >= 136) && (score.rank <= 164) , 
                        'titanium': (score.rank >= 165) && (score.rank <= 177) ,
                        'platinum': (score.rank >= 178) && (score.rank <= 200) , 
                        'amber': (score.rank >= 201) && (score.rank <= 234) , 
                        'gold': (score.rank >= 235) && (score.rank <= 263) , 
                        'silver': (score.rank >= 264) && (score.rank <= 289) , 
                        'bronze': (score.rank >= 290) && (score.rank <= 318) , 
                        'beginner': (score.rank >= 319) && (score.rank <= 346) , 
                        'wood': (score.rank >= 347)}"  target="_blank" :href="score.link">{{ score.level }}</a>
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
                        'amethyst': score.rank <= 2 , 
                        'pearl': (score.rank >= 3) && (score.rank <= 8) , 
                        'diamond': (score.rank >= 9) && (score.rank <= 21) , 
                        'ruby': (score.rank >= 22) && (score.rank <= 50) , 
                        'emerald': (score.rank >= 51) && (score.rank <= 84) , 
                        'jade': (score.rank >= 85) && (score.rank <= 103) , 
                        'malachite': (score.rank >= 104) && (score.rank <= 119) , 
                        'osmium': (score.rank >= 120) && (score.rank <= 135) ,
                        'sapphire': (score.rank >= 136) && (score.rank <= 164) , 
                        'titanium': (score.rank >= 165) && (score.rank <= 177) ,
                        'platinum': (score.rank >= 178) && (score.rank <= 200) , 
                        'amber': (score.rank >= 201) && (score.rank <= 234) , 
                        'gold': (score.rank >= 235) && (score.rank <= 263) , 
                        'silver': (score.rank >= 264) && (score.rank <= 289) , 
                        'bronze': (score.rank >= 290) && (score.rank <= 318) , 
                        'beginner': (score.rank >= 319) && (score.rank <= 346) , 
                        'wood': (score.rank >= 347)}" target="_blank" :href="score.link">{{ score.percent }}% {{ score.level }}</a>
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
