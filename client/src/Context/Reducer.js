export const reducer=(state,action)=>{
    switch(action.type){
      case "Add":
        return {...state,cart:[...state.cart,action.payload]};
      case "Remove":
        return {...state,cart:state.cart.filter((a)=>{
          return a.id!=action.payload.id;
        })};
      case "Quantity":
        return {...state,cart:state.cart.map((ele)=>{
          if(ele.id===action.payload.id){
            ele.quantity+=1;
          }
          return ele;
        })}
      case 'EmptyCart':
        return {...state,cart:[]};
      default:
        throw new Error("Unknow Type");
    }
}

export const reducerSearch=(state,action)=>{
    switch(action.type){
    case 'Ascending':
      return {...state,order:"Ascending"};
    case 'Descending':
      return {...state,order:"Descending"};
    case 'star':
      return {...state,star:action.payload};
    case 'Search':
      return {...state,search:action.payload};
    case 'Clear':
      return {order:"",star:0,search:""};
    default:
        throw new Error("Invalid Type");
    }
  }
