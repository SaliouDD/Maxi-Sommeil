import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const sleepStories = [
  {
    title: 'Le chalet sous la neige',
    duration: '8 min',
    text: 'Imagine un chalet calme, une lumière douce à la fenêtre et la neige qui absorbe tous les bruits. Chaque respiration rend la pièce plus chaude, plus lente, plus sûre.',
  },
  {
    title: 'La plage après le coucher du soleil',
    duration: '10 min',
    text: 'Les vagues arrivent, repartent, et déposent une fraîcheur tranquille. Ton corps devient lourd comme le sable humide, parfaitement soutenu.',
  },
  {
    title: 'Le train de nuit',
    duration: '12 min',
    text: 'Le wagon avance avec un rythme régulier. Les lumières défilent au loin, puis disparaissent doucement pendant que l’esprit lâche prise.',
  },
];

const breathingSteps = [
  { label: 'Inspire', seconds: 4 },
  { label: 'Retiens', seconds: 7 },
  { label: 'Expire', seconds: 8 },
];

export default function App() {
  const [selectedStory, setSelectedStory] = useState(sleepStories[0]);
  const [breathingIndex, setBreathingIndex] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(20);
  const pulse = useRef(new Animated.Value(0)).current;

  const breathingStep = breathingSteps[breathingIndex];
  const gradient = useMemo(
    () => ['#090d1f', '#15204a', '#26346f'],
    [],
  );

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: breathingStep.seconds * 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [breathingStep.seconds, pulse]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBreathingIndex((current) => (current + 1) % breathingSteps.length);
    }, breathingStep.seconds * 1000);

    return () => clearTimeout(timeout);
  }, [breathingStep]);

  const scale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.82, 1.14],
  });

  const opacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  });

  return (
    <LinearGradient colors={gradient} style={styles.screen}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>Maxi Sommeil</Text>
              <Text style={styles.title}>Dors plus vite, sans pression.</Text>
            </View>
            <Ionicons name="moon" size={34} color="#f8d98b" />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Respiration 4-7-8</Text>
            <Text style={styles.muted}>Suis le cercle et laisse le rythme ralentir tes pensées.</Text>
            <View style={styles.breathContainer}>
              <Animated.View style={[styles.breathCircle, { opacity, transform: [{ scale }] }]}>
                <Text style={styles.breathLabel}>{breathingStep.label}</Text>
                <Text style={styles.breathSeconds}>{breathingStep.seconds}s</Text>
              </Animated.View>
            </View>
          </View>

          <View style={styles.row}>
            {[10, 20, 30].map((minutes) => (
              <Pressable
                key={minutes}
                onPress={() => setTimerMinutes(minutes)}
                style={[styles.timerPill, timerMinutes === minutes && styles.timerPillActive]}
              >
                <Text style={[styles.timerText, timerMinutes === minutes && styles.timerTextActive]}>
                  {minutes} min
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.cardTitle}>Histoire du soir</Text>
              <Text style={styles.badge}>{selectedStory.duration}</Text>
            </View>
            <Text style={styles.storyTitle}>{selectedStory.title}</Text>
            <Text style={styles.storyText}>{selectedStory.text}</Text>
          </View>

          <Text style={styles.sectionTitle}>Ambiances rapides</Text>
          {sleepStories.map((story) => (
            <Pressable
              key={story.title}
              onPress={() => setSelectedStory(story)}
              style={[styles.soundRow, selectedStory.title === story.title && styles.soundRowActive]}
            >
              <Ionicons name="sparkles" size={20} color="#b9c6ff" />
              <View style={styles.soundTextWrap}>
                <Text style={styles.soundTitle}>{story.title}</Text>
                <Text style={styles.muted}>{story.duration} de visualisation guidée</Text>
              </View>
            </Pressable>
          ))}

          <View style={styles.footerCard}>
            <Ionicons name="alarm-outline" size={22} color="#f8d98b" />
            <Text style={styles.footerText}>
              Programme conseillé : écran posé, volume bas, minuteur {timerMinutes} minutes.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safeArea: { flex: 1 },
  content: { padding: 22, paddingBottom: 34, gap: 18 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  eyebrow: { color: '#aebcff', fontSize: 15, fontWeight: '700', letterSpacing: 1.4, textTransform: 'uppercase' },
  title: { color: '#ffffff', fontSize: 34, lineHeight: 40, fontWeight: '800', marginTop: 8, maxWidth: 300 },
  card: { backgroundColor: 'rgba(255,255,255,0.10)', borderColor: 'rgba(255,255,255,0.14)', borderWidth: 1, borderRadius: 28, padding: 20 },
  cardTitle: { color: '#ffffff', fontSize: 22, fontWeight: '800' },
  muted: { color: '#c8d0f7', fontSize: 14, lineHeight: 20, marginTop: 6 },
  breathContainer: { alignItems: 'center', justifyContent: 'center', height: 210 },
  breathCircle: { width: 156, height: 156, borderRadius: 78, backgroundColor: 'rgba(185,198,255,0.25)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.45)', alignItems: 'center', justifyContent: 'center' },
  breathLabel: { color: '#ffffff', fontSize: 26, fontWeight: '800' },
  breathSeconds: { color: '#f8d98b', fontSize: 18, fontWeight: '700', marginTop: 6 },
  row: { flexDirection: 'row', gap: 10 },
  timerPill: { flex: 1, paddingVertical: 14, borderRadius: 18, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.10)' },
  timerPillActive: { backgroundColor: '#f8d98b' },
  timerText: { color: '#dfe5ff', fontWeight: '800' },
  timerTextActive: { color: '#151a33' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  badge: { color: '#151a33', backgroundColor: '#f8d98b', overflow: 'hidden', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, fontWeight: '800' },
  storyTitle: { color: '#ffffff', fontSize: 18, fontWeight: '800', marginTop: 16 },
  storyText: { color: '#e5e9ff', fontSize: 16, lineHeight: 25, marginTop: 8 },
  sectionTitle: { color: '#ffffff', fontSize: 20, fontWeight: '800', marginTop: 4 },
  soundRow: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'transparent' },
  soundRowActive: { borderColor: '#f8d98b', backgroundColor: 'rgba(248,217,139,0.12)' },
  soundTextWrap: { flex: 1 },
  soundTitle: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  footerCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(0,0,0,0.20)', borderRadius: 20, padding: 16 },
  footerText: { color: '#e5e9ff', flex: 1, lineHeight: 21 },
});
