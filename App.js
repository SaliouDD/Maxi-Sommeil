import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const BREATHING_STEPS = [
  { label: 'Inspire', seconds: 4, hint: 'Remplis doucement les poumons.' },
  { label: 'Pause', seconds: 7, hint: 'Garde simplement le calme.' },
  { label: 'Expire', seconds: 8, hint: 'Relâche la mâchoire et les épaules.' },
];

const STORIES = [
  {
    title: 'Cabane sous la neige',
    time: '8 min',
    body: 'La neige tombe sans bruit autour de la cabane. À chaque souffle, la pièce devient plus chaude, plus douce, plus lente.',
  },
  {
    title: 'Vagues du soir',
    time: '10 min',
    body: 'Les vagues avancent puis repartent. Le sable soutient tout le corps, et les pensées s’éloignent avec la marée.',
  },
  {
    title: 'Train de nuit',
    time: '12 min',
    body: 'Le train glisse dans la nuit avec un rythme régulier. Les lumières deviennent floues, puis le silence prend plus de place.',
  },
];

export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [timer, setTimer] = useState(20);
  const [story, setStory] = useState(STORIES[0]);
  const pulse = useRef(new Animated.Value(0)).current;

  const currentStep = BREATHING_STEPS[stepIndex];
  const progress = useMemo(
    () => `${stepIndex + 1}/${BREATHING_STEPS.length}`,
    [stepIndex],
  );

  useEffect(() => {
    pulse.setValue(0);

    Animated.timing(pulse, {
      toValue: 1,
      duration: currentStep.seconds * 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      setStepIndex((value) => (value + 1) % BREATHING_STEPS.length);
    }, currentStep.seconds * 1000);

    return () => clearTimeout(timeout);
  }, [currentStep.seconds, pulse]);

  const circleScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.86, 1.16],
  });

  const circleOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.62, 1],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f1633" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.logo}>☾</Text>
          <Text style={styles.kicker}>Maxi Sommeil</Text>
          <Text style={styles.title}>Une routine simple pour t’endormir.</Text>
          <Text style={styles.subtitle}>
            Respire, choisis une ambiance, pose le téléphone et laisse la minuterie faire le reste.
          </Text>
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Respiration 4-7-8</Text>
            <Text style={styles.badge}>{progress}</Text>
          </View>

          <View style={styles.circleZone}>
            <Animated.View
              style={[
                styles.circle,
                {
                  opacity: circleOpacity,
                  transform: [{ scale: circleScale }],
                },
              ]}
            >
              <Text style={styles.circleLabel}>{currentStep.label}</Text>
              <Text style={styles.circleSeconds}>{currentStep.seconds}s</Text>
            </Animated.View>
          </View>

          <Text style={styles.centerHint}>{currentStep.hint}</Text>
        </View>

        <View style={styles.timerRow}>
          {[10, 20, 30].map((minutes) => {
            const active = timer === minutes;

            return (
              <Pressable
                key={minutes}
                onPress={() => setTimer(minutes)}
                style={[styles.timerButton, active && styles.timerButtonActive]}
              >
                <Text style={[styles.timerText, active && styles.timerTextActive]}>{minutes} min</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Histoire du soir</Text>
            <Text style={styles.badge}>{story.time}</Text>
          </View>
          <Text style={styles.storyTitle}>{story.title}</Text>
          <Text style={styles.storyBody}>{story.body}</Text>
        </View>

        <Text style={styles.sectionTitle}>Changer d’ambiance</Text>
        {STORIES.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => setStory(item)}
            style={[styles.storyChoice, story.title === item.title && styles.storyChoiceActive]}
          >
            <Text style={styles.choiceIcon}>✦</Text>
            <View style={styles.choiceCopy}>
              <Text style={styles.choiceTitle}>{item.title}</Text>
              <Text style={styles.choiceMeta}>{item.time} de visualisation guidée</Text>
            </View>
          </Pressable>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerIcon}>⏱</Text>
          <Text style={styles.footerText}>
            Conseil : luminosité basse, téléphone posé, minuteur {timer} minutes.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f1633',
  },
  container: {
    padding: 22,
    paddingBottom: 36,
    gap: 18,
  },
  hero: {
    paddingTop: 18,
  },
  logo: {
    color: '#f7d88b',
    fontSize: 44,
    fontWeight: '900',
  },
  kicker: {
    color: '#aebcff',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 6,
    textTransform: 'uppercase',
  },
  title: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 40,
    marginTop: 8,
  },
  subtitle: {
    color: '#cbd3ff',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  panel: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderColor: 'rgba(255,255,255,0.16)',
    borderRadius: 28,
    borderWidth: 1,
    padding: 20,
  },
  panelHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  panelTitle: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: '900',
  },
  badge: {
    backgroundColor: '#f7d88b',
    borderRadius: 999,
    color: '#161b34',
    fontSize: 13,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  circleZone: {
    alignItems: 'center',
    height: 210,
    justifyContent: 'center',
  },
  circle: {
    alignItems: 'center',
    backgroundColor: 'rgba(185,198,255,0.24)',
    borderColor: 'rgba(255,255,255,0.48)',
    borderRadius: 78,
    borderWidth: 1,
    height: 156,
    justifyContent: 'center',
    width: 156,
  },
  circleLabel: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
  },
  circleSeconds: {
    color: '#f7d88b',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 6,
  },
  centerHint: {
    color: '#e7ebff',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  timerRow: {
    flexDirection: 'row',
    gap: 10,
  },
  timerButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 18,
    flex: 1,
    paddingVertical: 14,
  },
  timerButtonActive: {
    backgroundColor: '#f7d88b',
  },
  timerText: {
    color: '#dfe5ff',
    fontWeight: '900',
  },
  timerTextActive: {
    color: '#161b34',
  },
  storyTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 16,
  },
  storyBody: {
    color: '#e8ebff',
    fontSize: 16,
    lineHeight: 25,
    marginTop: 8,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
  },
  storyChoice: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'transparent',
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    padding: 16,
  },
  storyChoiceActive: {
    backgroundColor: 'rgba(247,216,139,0.12)',
    borderColor: '#f7d88b',
  },
  choiceIcon: {
    color: '#b9c6ff',
    fontSize: 20,
    fontWeight: '900',
  },
  choiceCopy: {
    flex: 1,
  },
  choiceTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  choiceMeta: {
    color: '#cbd3ff',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.20)',
    borderRadius: 20,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  footerIcon: {
    color: '#f7d88b',
    fontSize: 22,
  },
  footerText: {
    color: '#e8ebff',
    flex: 1,
    lineHeight: 21,
  },
});
