import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';

interface ScoreEntry {
  name: string;
  score: number;
  timestamp: number;
}

const LeaderboardPage: React.FC = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const history = useHistory();

  useEffect(() => {
    const url = 'https://mobileappsprogram-6e65c-default-rtdb.firebaseio.com/scores.json';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const list: ScoreEntry[] = Object.values(data || {});
        list.sort((a, b) => b.score - a.score);
        setScores(list.slice(0, 10));
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar><IonTitle>Leaderboard</IonTitle></IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {scores.map((s, i) => (
            <IonItem key={i}>
              #{i + 1} — {s.name}: {s.score}s
            </IonItem>
          ))}
        </IonList>
        <IonButton expand="block" onClick={() => history.push('/start')}>
          Back to Main Menu
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LeaderboardPage;