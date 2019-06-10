import React from 'react'
import '../css/Card.css'
import LevelTube from './LevelTube'
import Level from './Level'
import {getStr,getHP,getWeak,getLevel} from '../Function/CardFunction';

const Card =(props)=>{
    const card = props.card;
    const hp = getHP(card);
    const weak = getWeak(card);
    const str = getStr(card);
    const level = getLevel(card);
    const {imageUrl,name} = card;

    return (
        <div className={'card'}>
            <div className={'card-image'}>
                <img src={imageUrl} alt={imageUrl}/>
            </div>
            <div className={'card-detail'}>
                <h1>{name}</h1>
                <div className={'stat'}>
                    <p className={'mg-0 wp-30'}>HP</p>
                    <div className={'wp-70'}>
                        <LevelTube percent={hp} />
                    </div>

                    <p className={'mg-0 wp-30'}>STR</p>
                    <div className={'wp-70'}>
                        <LevelTube percent={str} />
                    </div>

                    <p className={'mg-0 wp-30'}>WEAK</p>
                    <div className={'wp-70'}>
                        <LevelTube percent={weak} />
                    </div>
                </div>
                <Level level={level}/>
            </div>
            <p className={'mg-0 close'} onClick={()=>props.deleteCard(props.card)}>X</p>
        </div>
    );
}

export default Card;
