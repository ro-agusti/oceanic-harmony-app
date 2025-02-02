// import { ChallengePurchase } from '../models/challenges/ChallengePurchase.js';
// import  Challenge  from '../models/challenges/Challenge.js';

// const getPurchasedChallenges = async (req, res) => {
//     try {
//         const { userId } = req.user; // Asumiendo que el ID del usuario está en el token

//         // Buscamos las compras de desafíos para ese usuario
//         const purchasedChallenges = await ChallengePurchase.findAll({
//             where: { userId },
//             include: [{
//                 model: Challenge,
//                 attributes: ['id', 'title', 'description', 'price', 'days'],
//             }]
//         });

//         if (purchasedChallenges.length === 0) {
//             return res.status(404).json({ message: 'No has comprado ningún challenge aún.' });
//         }

//         // Responder con los desafíos comprados, incluyendo el ID de la compra
//         res.status(200).json({
//             message: 'Challenges comprados:',
//             challenges: purchasedChallenges.map(purchase => ({
//                 purchaseId: purchase.id,  // ID de la compra
//                 ...purchase.Challenge.toJSON(),
//             })),
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error al obtener los challenges comprados', error });
//     }
// };

// export {
//     getPurchasedChallenges
// } ;
