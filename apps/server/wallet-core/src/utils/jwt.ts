import jwt from 'jsonwebtoken';

export class Jwt {
  static createToken(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          _id: payload?._id,
          email: payload?.email,
          phone: payload?.phone,
          document: payload?.document,
        },
        'passwordForJson12webStoken',
        (error, token) => {
          if (error) {
            reject('error when creating token');
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  static createTokenPurchase(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          userId: payload.userId,
          _id: payload._id,
        },
        'passwordForJson12webStokenPurchase',
        (error, token) => {
          if (error) {
            reject('error when creating token');
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  static verifyPurchaseToken(token: string) {
    try {
      const userToken = jwt.verify(token, 'passwordForJson12webStokenPurchase');
      return userToken;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static verifyToken(token: string) {
    try {
      const userToken = jwt.verify(token, 'passwordForJson12webStoken');
      return userToken;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
