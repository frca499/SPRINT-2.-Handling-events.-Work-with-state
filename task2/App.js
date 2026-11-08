// TASK 2 — Interactive Profile Card
// Base: my Task 1 (layout and styling) + the new interactive features of Task 2.
// TODO: add the imports you need in each step (Pressable, Button, Alert, TextInput, useState...)
import { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  Button,
  Alert,
  TextInput,
} from 'react-native';

// colores del Task2
const COLORS = {
  primary: '#4F46E5',
  primaryLight: '#E0E7FF',
  text: '#111827',
  muted: '#6B7280',
  border: '#D1D5DB',
  offline: '#9CA3AF',
  error: '#DC2626', // BONUS: color for the error message
};

// mas info pal Task 2
const BIO =
  'Building cross-platform apps with React Native. I love clean layouts, accessible design and sharing what I learn with the community. When I am not coding, I mentor junior developers, contribute to open source and explore new coffee shops around the city.';

const SKILLS = ['React Native', 'JavaScript', 'UI Design', 'Git', 'Flexbox'];
const BASE_FOLLOWERS = 1200;
// TODO STEP 4: const MAX_MESSAGE = 140;
const MAX_MESSAGE = 140;

// Adds thousands separators: 1200 -> '1,200'
function formatCount(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// BONUS 3: reusable Tag component
function Tag({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tag,
        selected && styles.tagSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.tagText, selected && styles.tagTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function App() {
  // TODO STEP 3: add the state for follow / unfollow (useState)
  const [isFollowing, setIsFollowing] = useState(false);
  // BONUS 1: blocks the Follow button for 2 seconds after pressing it
  const [isBusy, setIsBusy] = useState(false);

  // TODO STEP 4: add the state for the message composer
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [message, setMessage] = useState('');
  const isSendDisabled = message.trim().length === 0;
  // BONUS 2: derived value, true when the limit is reached
  const isMaxLength = message.length === MAX_MESSAGE;

  // TODO STEP 5: add the state for the bio, the online status and the selected skills
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // STEP 3: followers must grow by 1 while you are following
  const followers = BASE_FOLLOWERS + (isFollowing ? 1 : 0);
  const stats = [
    { label: 'Projects', value: '24' },
    { label: 'Followers', value: formatCount(followers) },
    { label: 'Following', value: '180' },
  ];

  // TODO STEP 1: write the event handlers (handleFollowPress, handleMessagePress, handleSharePress)
  const handleFollowPress = () => {
    if (isBusy) return;
    setIsFollowing(!isFollowing);
    // BONUS 1: disable the button for 2 seconds
    setIsBusy(true);
    setTimeout(() => setIsBusy(false), 2000);
  };

  const handleMessagePress = () => {
    setIsComposerOpen(!isComposerOpen);
  };

  const handleSharePress = () => {
    Alert.alert('Share profile', 'Profile link copied!');
  };

  const handleSendPress = () => {
    Alert.alert('Message sent', message);
    setMessage('');
    setIsComposerOpen(false);
  };

  // Never mutate the array: create a new one with filter / spread
  const handleSkillPress = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Image
          style={styles.banner}
          resizeMode="cover"
          source={require('./assets/banner.png')}
        />
        <View style={styles.body}>
          <View style={styles.headerRow}>
            {/* TODO STEP 5: make the avatar pressable to toggle the online status */}
            <Pressable onPress={() => setIsOnline(!isOnline)}>
              <Image style={styles.avatar} source={require('./assets/avatar.png')} />
              <View style={[styles.onlineBadge, !isOnline && styles.offlineBadge]} />
            </Pressable>
            <View style={styles.headerText}>
              <Text style={styles.name}>Francisco Cardenas</Text>
              <Text style={styles.role}>Student</Text>
              <Text style={styles.location}>Jalisco, Mexico</Text>
            </View>
          </View>

          {/* TODO STEP 5: add a 'Read more' / 'Show less' link to expand the bio */}
          <Text style={styles.bio} numberOfLines={isBioExpanded ? undefined : 3}>
            {BIO}
          </Text>
          <Pressable onPress={() => setIsBioExpanded(!isBioExpanded)}>
            <Text style={styles.link}>
              {isBioExpanded ? 'Show less' : 'Read more'}
            </Text>
          </Pressable>

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
              <Tag
                key={skill}
                label={skill}
                selected={selectedSkills.includes(skill)}
                onPress={() => handleSkillPress(skill)}
              />
            ))}
          </View>
          <Text style={styles.hint}>
            Tap a skill to select it · {selectedSkills.length} selected
          </Text>

          {/* TODO STEP 1-3: turn these two Views into Pressable components with onPress.
                STEP 2: give them visual feedback with the style function (pressed).
                STEP 3: make the Follow button toggle between 'Follow' and 'Following'. */}
          <View style={styles.actions}>
            <Pressable
              onPress={handleFollowPress}
              disabled={isBusy}
              style={({ pressed }) => [
                styles.button,
                isFollowing ? styles.buttonFollowing : styles.buttonPrimary,
                isBusy && styles.buttonBusy,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={
                  isFollowing
                    ? [styles.buttonText, styles.buttonTextFollowing]
                    : styles.buttonPrimaryText
                }
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleMessagePress}
              style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            >
              <Text style={styles.buttonText}>
                {isComposerOpen ? 'Close' : 'Message'}
              </Text>
            </Pressable>
          </View>

          {/* TODO STEP 4: when 'Message' is pressed, show a composer here (TextInput + counter + Send) */}
          {isComposerOpen && (
            <View style={styles.composer}>
              <TextInput
                style={styles.input}
                value={message}
                onChangeText={(newText) => setMessage(newText)}
                maxLength={MAX_MESSAGE}
                placeholder="Write a message..."
                placeholderTextColor={COLORS.muted}
              />
              {/* BONUS 2: error shown when the 140 character limit is reached */}
              {isMaxLength && (
                <Text style={styles.errorText}>Maximum length reached</Text>
              )}
              <View style={styles.composerFooter}>
                <Text style={styles.counter}>
                  {message.length}/{MAX_MESSAGE} characters
                </Text>
                <Pressable
                  onPress={handleSendPress}
                  disabled={isSendDisabled}
                  style={({ pressed }) => [
                    styles.sendButton,
                    isSendDisabled && styles.sendButtonDisabled,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.sendText}>Send</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* TODO STEP 1: add a 'Share profile' Button here */}
          <View style={styles.shareWrapper}>
            <Button
              title="Share profile"
              color={COLORS.primary}
              onPress={handleSharePress}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ancla del Task 2
  screen: { flex: 1, backgroundColor: '#EEF1F6' },
  screenContent: { paddingTop: 64, paddingHorizontal: 20, paddingBottom: 40 },

  //    estilos del Task1 
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  banner: {
    width: '100%',
    height: 120,
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: -40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  onlineBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22C55E',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  headerText: {
    marginLeft: 14,
    paddingBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  role: {
    fontSize: 14,
    color: '#4B5563',
  },
  location: {
    fontSize: 13,
    color: '#6B7280',
  },
  bio: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  tag: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 12,
    color: '#3730A3',
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
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  buttonPrimary: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  buttonText: {
    color: '#111827',
    fontWeight: '600',
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  //     estilos del Task2  
  buttonFollowing: {
    backgroundColor: COLORS.primaryLight,
  },
  composer: {
    marginTop: 16,
  },
  composerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  counter: {
    fontSize: 12,
    color: COLORS.muted,
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.muted,
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
  },
  link: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  offlineBadge: {
    backgroundColor: COLORS.offline,
  },
  pressed: {
    opacity: 0.6,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.offline,
  },
  sendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  shareWrapper: {
    marginTop: 12,
    alignItems: 'center',
  },
  tagSelected: {
    backgroundColor: COLORS.primary,
  },
  tagTextSelected: {
    color: '#FFFFFF',
  },

  //       Estilos extras
  buttonTextFollowing: {
    color: COLORS.primary,
  },
  buttonBusy: {
    opacity: 0.4,
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.error,
  },
});