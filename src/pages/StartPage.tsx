import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const StartPage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tilt Maze</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ textAlign: 'center' }}>
        <div style={{ marginTop: '40%' }}>
          <h1>Tilt Maze</h1>
          <p>Tilt your phone to dodge the obstacles and survive as long as you can!</p>
          <IonButton expand="block" onClick={() => history.push('/game')}>
            Start Game
          </IonButton>
          <IonButton expand="block" fill="outline" onClick={() => history.push('/leaderboard')}>
            View Leaderboard
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StartPage;