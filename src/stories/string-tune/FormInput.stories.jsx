import { FormField } from '../../components/string-tune';
import { FormInput } from '../../components/string-tune/recipes/FormInput.jsx';

const meta = {
  title: 'StringTune/Recipes/FormInput',
  component: FormInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '검증 스타일이 내장된 폼 필드 Recipe 컴포넌트입니다. `name`, `validation` prop만 전달하면 **label + input + 에러 메시지 + 유효성 스타일**이 바로 동작합니다. 내부적으로 FormField Wrapper와 StringForm 모듈을 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      description: '필드 이름 (고유 식별자)',
      control: 'text',
    },
    label: {
      description: '라벨 텍스트',
      control: 'text',
    },
    type: {
      description: '입력 타입',
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'textarea', 'checkbox', 'select'],
    },
    placeholder: {
      description: 'Placeholder 텍스트',
      control: 'text',
    },
    validation: {
      description: 'StringForm 유효성 규칙 (예: required|email, required|min(8))',
      control: 'text',
    },
  },
};

export default meta;

export const SignUpForm = {
  render: () => (
    <FormField
      as="form"
      style={{
        width: '400px',
        maxWidth: '90vw',
        background: '#3687ff',
        padding: '32px 24px',
        borderRadius: '12px',
        color: 'white',
      }}
      {...{ 'string-id': 'signup-demo' }}
    >
      <div style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '24px' }}>Sign Up</div>

      <FormInput
        name="username"
        label="Username"
        placeholder="Only letters, numbers, dash, underscore"
        validation="required|min(4)|max(20)|alpha_dash"
      />

      <FormInput
        name="email"
        label="Email"
        type="email"
        placeholder="Enter a valid email address"
        validation="required|email"
      />

      <FormInput
        name="password"
        label="Password"
        type="password"
        placeholder="At least 8 characters"
        validation="required|min(8)"
      />

      <FormInput
        name="password_confirm"
        label="Confirm Password"
        type="password"
        placeholder="Re-enter your password"
        validation="required|same:password"
      />

      <FormInput
        name="terms"
        label="I agree to the terms and conditions"
        type="checkbox"
        validation="checked"
      />

      <button
        type="submit"
        style={{
          display: 'block',
          width: '100%',
          padding: '12px',
          background: 'white',
          color: 'black',
          border: 'none',
          borderRadius: '6px',
          fontSize: '0.95rem',
          cursor: 'pointer',
          marginTop: '16px',
        }}
      >
        Validate
      </button>
    </FormField>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FormInput으로 구성한 회원가입 폼. Validate 버튼을 누르면 StringForm이 유효성을 검사하고 에러 스타일을 자동 토글합니다.',
      },
    },
  },
};

export const SingleField = {
  args: {
    name: 'demo-email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    validation: 'required|email',
  },
  render: (args) => (
    <div style={{ width: '320px', maxWidth: '90vw', color: 'white' }}>
      <FormInput {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '단일 FormInput 필드. args를 변경하여 다양한 타입과 유효성 규칙을 테스트할 수 있습니다.',
      },
    },
  },
};
