import React, {Component} from 'react';
import '../css/App.css';
import Card from '../Component/Card';
import Modal from '../Component/Modal';

// const COLORS = {
//     Psychic: "#f8a5c2",
//     Fighting: "#f0932b",
//     Fairy: "#c44569",
//     Normal: "#f6e58d",
//     Grass: "#badc58",
//     Metal: "#95afc0",
//     Water: "#3dc1d3",
//     Lightning: "#f9ca24",
//     Darkness: "#574b90",
//     Colorless: "#FFF",
//     Fire: "#eb4d4b"
// }

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCard: [],
            cardPokedex:[],
            cardSearchList:[],
            openModal:false,
        };
    }

    async componentDidMount() {
        await this.fetchCard();
    }

    openModal=()=>{
        this.setState({openModal:true});
    }

    closeModal=()=>{
        this.setState({openModal:false});
    }

    fetchCard=()=>{
        fetch("http://localhost:3030/api/cards")
            .then(res => res.json())
            .then(card => {
                const allCard = card.cards;
                this.setState({
                    allCard,
                    cardSearchList:allCard,
                    cardPokedex:[],
                })
            });
    }

    searchCard=(e)=>{
        const searchText = e.target.value;
        const searchCardType = this.searchCardType(searchText);
        const searchCardName = this.searchCardName(searchText);
        const cardSearchList = this.combineCardArrayWithoutDuplicate(searchCardType,searchCardName);
        this.setState({
            cardSearchList
        });
    }

    combineCardArrayWithoutDuplicate =(searchCardType,searchCardName)=>{
        let cardSearchList =[];
        cardSearchList = cardSearchList.concat(searchCardType);
        const allCardTypeId = searchCardType.map((card)=>(card.id));
        searchCardName.forEach((card)=>{
            if(!allCardTypeId.includes(card.id)){
                cardSearchList = cardSearchList.concat([card]);
            }
        });
        return cardSearchList;
    }

    searchCardName=(searchText)=>{
        const allSearchListCard = this.getCardSearchList(this.state.cardPokedex);
        return allSearchListCard.filter((card)=>{
            return card.name.toLowerCase().includes(searchText.toLowerCase());
        });
    }

    searchCardType=(searchText)=>{
        const allSearchListCard = this.getCardSearchList(this.state.cardPokedex);
        return allSearchListCard.filter((card)=>{
            return card.type.toLowerCase().includes(searchText.toLowerCase());
        });
    }

    addCardToCardPokedex=(card)=>{
        let cardPokedex = this.state.cardPokedex;
        cardPokedex = cardPokedex.concat([card])
        const cardSearchList =  this.getCardSearchList(cardPokedex);
        this.setState({
            cardPokedex,
            cardSearchList
        })
    }

    deleteCardFromPokedex=(card)=>{
        let cardPokedex = this.state.cardPokedex;
        const allPokedexIdCard = cardPokedex.map((card)=>card.id);
        const deleteItem = allPokedexIdCard.findIndex((element)=>(card.id===element));
        cardPokedex.splice(deleteItem,1);
        const cardSearchList = this.getCardSearchList(cardPokedex);
        this.setState({
            cardPokedex,
            cardSearchList
        })
    }

    getCardSearchList=(cardPokedex)=>{
        const allCard = this.state.allCard;
        const allPokedexIdCard = cardPokedex.map((card)=>card.id);
        return allCard.filter((card)=>{
            return !allPokedexIdCard.includes(card.id);
        })
    }

    render() {
        // console.log(this.state.allCard);
        const cardPokedexList = this.state.cardPokedex;
        const cardPokedexListComponent = cardPokedexList.map((card) => (<Card key={card.id} card={card} deleteCard={this.deleteCardFromPokedex}/>));
        return (
            <div className="App">
                <div className={"title-container align-middle"}>
                    <h1 className={'text-center header'}>My Pokedex</h1>
                </div>

                <div className={'card-area'}>
                    {cardPokedexListComponent}
                </div>


                <div className={'footer'}>
                </div>
                <div className={' align-middle'}>
                    <span className={'half-circle plus'} onClick={this.openModal}>+</span>
                </div>
                <Modal
                    searchCard={this.searchCard}
                    openModal={this.state.openModal}
                    closeModal ={this.closeModal}
                    card={this.state.cardSearchList}
                    addCard={this.addCardToCardPokedex}
                />
            </div>
        )
    }
}

export default App
