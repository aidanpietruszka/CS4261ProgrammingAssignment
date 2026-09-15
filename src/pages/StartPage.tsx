import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const StartPage: React.FC = () => {
  const history = useHistory();

  const handleStart = () => {
    const DME = DeviceMotionEvent as any;
    if (typeof DME.requestPermission === 'function') {
      DME.requestPermission()
        .then((state: string) => {
          console.log('motion permission:', state);
          history.push('/game');
        })
        .catch((err: any) => {
          console.error('motion permission error:', err);
          history.push('/game'); // proceed anyway, keyboard fallback still works
        });
    } else {
      // Not iOS 13+ Safari-style permission model, just proceed
      history.push('/game');
    }
  };

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
          <IonButton expand="block" onClick={handleStart}>
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