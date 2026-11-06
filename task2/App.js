// TASK 2 — Interactive Profile Card (starter)
// Start point: the solution of Task 1 + the new data. Follow the steps in README.md.
// TODO: add the imports you need in each step (Pressable, Button, Alert, TextInput, useState...)
import { View, Text, Image, ScrollView, StyleSheet, Platform } from 'react-native';

const COLORS = {
  background: '#EEF1F6',
  card: '#FFFFFF',
  text: '#1B1F2A',
  muted: '#6B7280',
  primary: '#2F6FED',
  primaryLight: '#E6EEFF',
  border: '#E5E7EB',
  online: '#22C55E',
  offline: '#9CA3AF',
};

const BIO =
  'Building cross-platform apps with React Native. I love clean layouts, accessible design and sharing what I learn with the community. When I am not coding, I mentor junior developers, contribute to open source and explore new coffee shops around the city.';

const SKILLS = ['React Native', 'JavaScript', 'UI Design', 'Git', 'Flexbox'];
const BASE_FOLLOWERS = 1200;
// TODO STEP 4: const MAX_MESSAGE = 140;

// Adds thousands separators: 1200 -> '1,200'
function formatCount(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function App() {
  // STEP 3: followers must grow by 1 while you are following
  const followers = BASE_FOLLOWERS;
  const stats = [
    { label: 'Projects', value: '24' },
    { label: 'Followers', value: formatCount(followers) },
    { label: 'Following', value: '180' },
  ];

  // TODO STEP 1: write the event handlers (handleFollowPress, handleMessagePress, handleSharePress)
  // TODO STEP 3: add the state for follow / unfollow (useState)
  // TODO STEP 4: add the state for the message composer
  // TODO STEP 5: add the state for the bio, the online status and the selected skills

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Image
          source={require('./assets/banner.png')}
          style={styles.banner}
          resizeMode="cover"
        />
        <View style={styles.body}>
          <View style={styles.headerRow}>
            {/* TODO STEP 5: make the avatar pressable to toggle the online status */}
            <View>
              <Image source={require('./assets/avatar.png')} style={styles.avatar} />
              <View style={styles.onlineBadge} />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.name}>Alex Rivera</Text>
              <Text style={styles.role}>Mobile Developer</Text>
              <Text style={styles.location}>Lisbon, Portugal</Text>
            </View>
          </View>

          {/* TODO STEP 5: add a 'Read more' / 'Show less' link to expand the bio */}
          <Text style={styles.bio} numberOfLines={3}>
            {BIO}
          </Text>

          <View style={styles.statsRow}>
            {stats.map((item, index) => (
              <View
                key={item.label}
                style={[styles.stat, index < stats.length - 1 && styles.statDivider]}
              >
                <Text style={styles.statValue}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* TODO STEP 5: make the skills selectable (Pressable + array state) */}
          <View style={styles.tags}>
            {SKILLS.map((skill) => (
              <View key={skill} style={styles.tag}>
                <Text style={styles.tagText}>{skill}</Text>
              </View>
            ))}
          </View>

          {/* TODO STEP 1-3: turn these two Views into Pressable components with onPress.
                STEP 2: give them visual feedback with the style function (pressed).
                STEP 3: make the Follow button toggle between 'Follow' and 'Following'. */}
          <View style={styles.actions}>
            <View style={[styles.button, styles.buttonPrimary]}>
              <Text style={[styles.buttonText, styles.buttonTextPrimary]}>Follow</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Message</Text>
            </View>
          </View>

          {/* TODO STEP 4: when 'Message' is pressed, show a composer here (TextInput + counter + Send) */}

          {/* TODO STEP 1: add a 'Share profile' Button (core component) here */}
        </View>
      </View>
    </ScrollView>
  );
}

const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  android: {
    elevation: 6,
  },
  default: {},
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    ...cardShadow,
  },
  banner: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: -44,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: COLORS.card,
  },
  onlineBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.online,
    borderWidth: 3,
    borderColor: COLORS.card,
  },
  headerText: {
    flex: 1,
    marginLeft: 14,
    marginTop: 52,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  role: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 2,
  },
  location: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },
  bio: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.text,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 18,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  statDivider: {
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  tag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
  },
});
