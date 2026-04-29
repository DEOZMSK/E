export const calculateFlexibility=(sitAndReachCm:number)=>({sitAndReachCm,level:sitAndReachCm<0?"низкая":sitAndReachCm<10?"средняя":"хорошая"});
