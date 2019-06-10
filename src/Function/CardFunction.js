const getHP =(card)=>{
    let {hp} = card;
    hp = (hp>100) ? 100 :(hp<=100)? hp : 0;
    return hp;
}

const getWeak= (card)=>{
    let weak = ('weaknesses' in card)?card.weaknesses[0].value:0;
    const weakRegex = /\d+/;
    weak = weakRegex.exec(weak)[0]*100;
    return weak>100?100:weak;
}

const getStr =(card)=>{
    let str = ('attacks' in card)?card.attacks.length:0;
    return str*50;
}

const getDamage = (card) => {
    let damage;
    if('attacks' in card)
    {
        const attacks = card.attacks;
        damage = attacks.map((attack)=>{
            const damageRegex = /\d+/;
            return damageRegex.exec(attack.damage)?Number(damageRegex.exec(attack.damage)[0]):0;
        });
        damage = damage.reduce((acc,current)=>(acc+current));
        return damage;
    }
    return 0;
}

const getLevel = (card)=>{
    console.log(card.name);
    console.log("hp:"+getHP(card));
    console.log("damage:"+getDamage(card));
    console.log("weak:"+getWeak(card));
    console.log("str:"+getStr(card));

    console.log(
        `((${getHP(card)} / ${10}) + (${getDamage(card)} /${10} ) + ${10} - ${getWeak(card)}) / ${5}`
    )
    const level =((getHP(card) / 10) + (getDamage(card) /10 ) + 10 - getWeak(card)) / 5;
    return level<1?5:level;
}

export { getLevel, getWeak, getDamage,getHP,getStr };