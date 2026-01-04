import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../../components/string-tune';
import './string-tune.css';

const meta = {
  title: 'StringTune/Basic/FormField',
  component: FormField,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '폼 필드의 유효성 상태를 CSS 클래스로 제공합니다. 내부 input/textarea의 상태에 따라 `-valid`, `-invalid`, `-error`, `-focus` 클래스가 자동으로 토글됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'fieldset', 'label'],
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <div className="form-demo-wrapper">
      <div className="instruction">Type in the fields to see validation states</div>

      <div className="form-container">
        <h2>Sign Up</h2>

        <FormField className="form-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            required
          />
          <div className="hint">Please enter a valid email address</div>
        </FormField>

        <FormField className="form-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Min 8 characters"
            required
            minLength={8}
          />
          <div className="hint">Password must be at least 8 characters</div>
        </FormField>

        <FormField className="form-field">
          <label>Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            required
            pattern="[a-zA-Z0-9_]+"
          />
          <div className="hint">Only letters, numbers, and underscores</div>
        </FormField>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '이메일, 비밀번호, 사용자명 필드가 있는 폼 예제입니다. 각 필드에 입력하면 HTML5 유효성 검사에 따라 `-valid` 또는 `-invalid` 클래스가 적용됩니다.',
      },
    },
  },
};
