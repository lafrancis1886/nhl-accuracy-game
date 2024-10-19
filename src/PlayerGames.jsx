import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'
import Carousel from './Carousel'
import Accordian from './Accordian'
import ScoreboardBellow from './ScoreboardBellow'
import ReviewBellow from './ReviewBellow'
import NewsBellow from './NewsBellow'

export default class PlayerGames extends React.Component {
    constructor(props) {
        super(props)

        bindAllNonReactPrototypeMethods(this)
    }

    render() {
        return <div className="player-game-center-container">
            <div className="player-bio">
                Lorem ipsum dolor sit amet, mei splendide dissentias te. An aperiam dolorem invidunt vim. At fugit principes definiebas eum. Augue nulla nihil ius eu, quaestio electram suavitate pro et. In vim omnis vidisse tacimates, at recteque similique appellantur usu, in duo causae atomorum dissentiunt. Ex ius inani error, laoreet erroribus cotidieque et sea. Ex vidisse accumsan nam. Vim diceret sapientem ei, utroque oporteat sit ex. Ut sed ullum nostro vulputate, quo nobis putant ei. Aliquam facilis oportere ex mei. Vix eu graeco salutandi, nam ne mazim legimus. Ad dictas fuisset cum. Ipsum etiam saepe sea in. Latine intellegat democritum vel no, ad his lorem alienum adolescens. Laudem lucilius vix ex, ne eligendi sensibus sit. Sea et veniam prodesset referrentur, inermis tractatos qui at, eos ex laboramus consetetur. Ea dolorem dissentiunt mea, ad nec dicant tincidunt definitiones. In quot quando mel, noluisse accommodare eam an. Ut quis purto definitionem cum, viris sanctus corrumpit in vix. Ne natum illud quo, ei meis temporibus vim. Ea his sanctus phaedrum, accumsan legendos disputationi eam et. Vim iisque nostrum cu, has no aeterno ullamcorper, dicunt menandri ne cum. Ex lorem abhorreant per, commune lucilius mandamus quo id, nostro splendide duo at. Eam ex atomorum erroribus consequuntur, ei unum dolorem ius. At usu nihil tempor eirmod, ei sed facilisis definiebas. In autem detracto explicari has, solet dissentiet et pro. Possit pertinax nam te.
            </div>
            <div className="player-game-center-divider">Game Center</div>
            <Carousel title={'Select a Game'} frames={[{id: 123, image: '../stats-accuracy.png', alt: "NHL Statistical Accuracy Game"}, {id: 456, image: '../More-Coming-Soon.png', alt: "More games coming soon"}, {id: 678, image: '../anahiem-hero.png', alt: "More games coming soon"}, {id: 789, image: '../gagne-hero.jpg', alt: "More games coming soon"}]} height={"400"} width={"400"}  />
            <Accordian initExpandIndex={0} titles={['Scoreboard', 'Reviews', 'News and Notes']} >
                <ScoreboardBellow bellowItems={[{id: 987, player: 'Jeffrey Dallas', score: 95}, {id: 876, player: 'Nick Swift', score: 87}, {id: 765, player: 'Bill Teds', score: 65}]}/>
                <ReviewBellow bellowItems={[{id: 654, reviewer: "John Stamos", stars: 5, review: "Lorem ipsum dolor sit amet, sit idque putant ut, est ea dico ullum expetendis, ex eos invenire delicatissimi necessitatibus. Zril menandri postulant ne eum, movet exerci admodum sed ut, vel no error accusata eloquentiam. Iusto commune ut eos. Eu enim idque dicat nam, et his animal theophrastus. Nostro scripta ea quo, ex vix elitr persequeris. Splendide voluptaria vim at, cu pro dicta platonem."}, {id: 543, reviewer: "Jake the Snake", stars: 3, review: "Pro dolor scripta ne, mel decore intellegam in. Ipsum utroque facilisi ei quo. Sed ad nibh mediocritatem, et eam idque scribentur. Et unum ferri quaerendum sit, aeterno invidunt cu pri. Viderer ornatus nam in, in per tantas malorum salutatus. Eu duo veri pertinacia, duo causae postulant appellantur et, ex ludus voluptatibus delicatissimi eos."}, {id: 432, reviewer: "Bill the Butcher", stars: 4, review: "Eum ut habeo nusquam eligendi, ne vis sint suscipit oportere, id adhuc harum partiendo est. Vim solum brute clita in, perfecto repudiare ex vis. Amet hendrerit usu ex, pri dicta periculis liberavisse no, nam alienum tibique copiosae ne. Agam audire mandamus vis id, habemus quaestio posidonium id eum, alii viderer prodesset no mel. Illum animal mediocritatem eu nec, explicari laboramus disputationi eum ea. Ad vidit erant qui, vim nobis dolor omnesque no."}]}/>
                <NewsBellow bellowItems={[{id: 321, title: "More Games to Come!", body: "Duo et quot causae. Tota dicat mea ne. Tempor discere necessitatibus sit in, altera abhorreant ut sea. Ut tantas accusam eum, eu vis apeirian delicata adversarium. Ea pri omnis ceteros democritum. Facete nostrud ex eum, no mei percipitur dissentiet, an vero admodum mel. Ei his tollit exerci disputando, te eam wisi vidisse ornatus, est suscipit convenire gloriatur cu. Ei persius docendi electram pro, nec te nominavi suavitate. Mea nibh labitur no, his eu iusto alterum nominati. Epicurei constituto duo at. Et qui dolore mucius dissentias, ex sit iracundia referrentur. Vis probo inermis iracundia te."}]}/>
            </Accordian>
        </div>
    }
}