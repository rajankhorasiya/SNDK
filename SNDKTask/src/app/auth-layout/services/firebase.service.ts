import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class FirebaseService {

  public isLoggedIn: boolean = false;

  constructor(public firebaseAuth: AngularFireAuth) { }

  /**
   * 
   * @param email 
   * @param password 
   * Firebase login Service used with async and await.
   */
  async login(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then((res: { user: any; }) => {
      this.isLoggedIn = true;
      localStorage.setItem("LOGGEDIN_USER", JSON.stringify(res.user));
    }).catch((error: any) => {
      console.log(error);
      this.isLoggedIn = false;
    });
  }

}
