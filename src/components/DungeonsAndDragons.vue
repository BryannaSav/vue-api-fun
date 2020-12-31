<template>
    <v-container class="dungeons-and-dragons">
        <h1 class="main-text">Welcome to the D&D Spell Compendium</h1>
        <v-divider></v-divider>
        <v-row>
            <v-spacer></v-spacer>
            <v-col>
                <h3 class="main-text">SEARCH</h3>
            </v-col>
            <v-col>
                <h3 class="main-text">-OR-</h3>
            </v-col>
            <v-col>
                <h3 class="main-text">SELECT</h3>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col> 
            <v-form v-on:submit.prevent="getSpell(search.qry)" id="spell-search">
                <v-text-field 
                    label="Search for a Spell"
                    placeholder="Cure Wounds"
                    filled
                    v-model="search.qry"
                ></v-text-field>
                <v-btn form="spell-search" v-on:click.prevent="getSpell(search.qry)">Search</v-btn>
            </v-form>
            <v-divider class="mt-4"></v-divider>
            <h3 class="pt-8">Spell Description:</h3>           
            <div class="pt-3"> {{desc}} </div>
            </v-col>
            <v-col>
                <ul class="spell-list">
                    <li v-for="spell in spells" v-bind:key="spell.index">
                        <a href="" v-on:click.prevent="selectSpell(spell.url)">{{spell.name}}</a>
                    </li>
                </ul>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            spells: [],
            spell: {},
            desc: "",
            test: "peanut",
            search: {
                qry: ""
            },
        }
    },
    methods:
    {
        async getSpell(spell_search) {
            try {
                this.desc=""
                spell_search = spell_search.toLowerCase()
                let query = 'https://www.dnd5eapi.co/api/spells/' + spell_search.replace(" ","-")
                const response = await fetch(query)
                const data = await response.json()
                this.spell = data
                // this.desc = this.spell.desc[0]
                for (var text of this.spell.desc) {
                    this.desc += text 
                }
            } catch (error) {
                console.error(error)
            }
        },
        async getAllSpells() {
            try {
                console.log("getting all spells")
                const response = await fetch('https://www.dnd5eapi.co/api/spells/')
                const data = await response.json()
                this.spells = data.results
            } catch (error) {
                console.error(error)
            }
        },
        selectSpell(selected_spell) {
            selected_spell = selected_spell.replace("/api/spells/","")
            this.getSpell(selected_spell)
        }
    },
    mounted() {
        this.getAllSpells()
    }
}
</script>

<style scoped>
    .main-text{
        text-align: center;
    }
</style>
