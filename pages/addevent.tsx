import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
    createStyles,
    Group,
    Text,
    TextInput,
    Select,
    Textarea,
    useMantineTheme,
    MantineTheme,
    DEFAULT_THEME,
    NativeSelect,
    Checkbox,
    NumberInput,
} from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { DatePicker } from '@mantine/dates';
const useStyles = createStyles((theme) => ({
    root: {
      position: 'relative',
    },
  
    input: {
      height: 'auto',
      paddingTop: 18,
    },
  
    label: {
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: theme.fontSizes.xs,
      paddingLeft: theme.spacing.sm,
      paddingTop: theme.spacing.sm / 2,
      zIndex: 1,
    },
  }));
  function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
    return status.accepted
      ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
      : status.rejected
      ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[0]
      : theme.colors.gray[7];
  }
  function ImageUploadIcon({
    status,
    ...props
  }: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
    if (status.accepted) {
      return <Upload {...props} />;
    }
  
    if (status.rejected) {
      return <X {...props} />;
    }
  
    return <Photo {...props} />;
  }
  export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
    <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
      <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />
  
      <div>
        <Text size="xl" inline>
          Drag images here or click to select files
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          Attach as many files as you like, each file should not exceed 5mb
        </Text>
      </div>
    </Group>
  );
  const moneyData = [
    { value: 'eur', label: '🇪🇺 EUR' },
    { value: 'usd', label: '🇺🇸 USD' },
    { value: 'cad', label: '🇨🇦 CAD' },
    { value: 'gbp', label: '🇬🇧 GBP' },
    { value: 'aud', label: '🇦🇺 AUD' },
  ];
  export function CurrencyInput() {

  }
export default function AddEvent() {
    const { classes } = useStyles();
    const[eventTitle, setEventTitle] = useState('');
    const[eventDesc, setEventDesc] = useState('');
    const[eventURL, setEventURL] = useState('');
    const[meetURL, setMeetURL] = useState('');
    const[slots, setSlots] = useState(0);
    const[start, setStart] = useState(new Date());
    const[end, setEnd] = useState(new Date());
    const[location, setLocation] = useState('');
    const[discord, setDiscord] = useState('');

    const select = (
        <NativeSelect
          data={moneyData}
          styles={{
            input: {
              fontWeight: 500,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            },
          }}
        />
      );
    return(
        <>
        <Group spacing='md' direction='column' grow>
            <Text>Create a new event</Text>
            <TextInput label="Event title" placeholder="important meeting" classNames={classes} value={eventTitle} onChange={(event) => setEventTitle(event.currentTarget.value)}/>
            <Textarea label="Event description" placeholder="An important meeting about..." classNames={classes} value={eventDesc} onChange={(event) => setEventDesc(event.currentTarget.value)}/>

            <Dropzone
                onDrop={(files) => console.log('accepted files', files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
            >
             {(status) => dropzoneChildren(status, DEFAULT_THEME)}
            </Dropzone>
            <TextInput label="Event URL" placeholder="https://" classNames={classes} value={eventURL} onChange={(event) => setEventURL(event.currentTarget.value)}/>
            <TextInput label="Meet URL" placeholder="https://" classNames={classes} value={meetURL} onChange={(event) => setMeetURL(event.currentTarget.value)}/>
            <NativeSelect
            data={['Free for all', 'Invite Only']}
            placeholder="Choose who can access your event"
            label="Choose who can access your event"
            required />
            <Checkbox label='Limit number of participants' checked={slots!=0} onChange={(event) => setSlots(event.currentTarget.checked? 1 : 0)}/>
            <NumberInput placeholder='Max number of participants' disabled={slots===0}  onChange={(val:number) => setSlots(val)}/>
            <DatePicker
                style={{ marginTop: 20 }}
                label="Event start"
                placeholder="When will your event start"
                classNames={classes}
                clearable={false}
                value={start} onChange={(val:Date) => setStart(val)}
            />
            <DatePicker
                style={{ marginTop: 20 }}
                label="Event end"
                placeholder="When will your event end"
                classNames={classes}
                clearable={false}
                value={end} onChange={(val:Date) => setEnd(val)}
            />
            <TextInput
                type="number"
                placeholder="10"
                label="entry cost"
                rightSection={select}
                rightSectionWidth={92}
            />
            <TextInput label="Event Location" placeholder="discord server link or real life address" classNames={classes} value={location} onChange={(event) => setLocation(event.currentTarget.value)}/>
            <TextInput label="Host discord" placeholder="Name#0123" classNames={classes} value={discord} onChange={(event) => setDiscord(event.currentTarget.value)}/>
        </Group>
        </>
    );
}