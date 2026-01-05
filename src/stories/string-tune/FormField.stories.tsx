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
      <form className="form-container" data-string="form" data-string-id="demo">
        <FormField as="fieldset" className="form-field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Only letters, numbers, dash, underscore"
          />
          <div className="error-message">
            <span>Required field</span>
          </div>
        </FormField>

        <FormField as="fieldset" className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter a valid email address"
          />
          <div className="error-message">
            <span>Invalid email format</span>
          </div>
        </FormField>

        <FormField as="fieldset" className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="At least 8 characters"
          />
          <div className="error-message">
            <span>Minimum 8 characters required</span>
          </div>
        </FormField>

        <FormField as="fieldset" className="form-field">
          <label htmlFor="password_confirm">Confirm Password</label>
          <input
            type="password"
            name="password_confirm"
            id="password_confirm"
            placeholder="Re-enter your password"
          />
          <div className="error-message">
            <span>Passwords do not match</span>
          </div>
        </FormField>

        <FormField as="fieldset" className="form-field checkbox-field">
          <input
            type="checkbox"
            name="terms"
            id="terms"
          />
          <label htmlFor="terms">I agree to the terms and conditions</label>
        </FormField>

        <button type="submit">Validate</button>
      </form>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '파란색 테마의 회원가입 폼입니다. 각 필드에 입력하면 유효성 상태에 따라 `-valid`, `-invalid`, `-error` 클래스가 적용되어 시각적 피드백이 제공됩니다.',
      },
    },
  },
};
