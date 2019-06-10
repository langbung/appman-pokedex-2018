import React,{Component} from 'react'
import Modals from 'react-modal';
import Search from '../search.png';
import '../css/Modal.css'
import CardMarket from './CardMarket';
Modals.setAppElement('#root');
class Modal extends Component{
    constructor(props){
        super(props)
        this.state = {
          card:[],
        };
    }

    handleInputOnchange=(e)=>{
        this.props.searchCard(e);
    }

    render() {
        const cardList = this.props.card;
        const cardListComponent = cardList.map(
            (card) => (
                <CardMarket
                    key={card.id}
                    card={card}
                    addCard={this.props.addCard}
                />
            )
        );
        return(
            <Modals
                isOpen={this.props.openModal}
                onRequestClose={this.props.closeModal}
                className={'Modal'}
                overlayClassName={'Overlay'}
                // contentLabel="Example Modal"
            >
                <div className={'modal-container'}>
                    <div className={'title'}>
                        <input type="text" placeholder={'Find pokemon'} onChange={this.handleInputOnchange}/>
                        <img className={'search'} src={Search} alt="search icon"/>
                    </div>
                    <div className={'card-find-area'}>
                        {cardListComponent}
                    </div>
                </div>
            </Modals>
        )
    }
}

export default Modal