import { FormField } from '../form/FormField.jsx';

const STYLE_ID = 'st-form-input-recipe';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .st-form-input {
      position: relative;
      margin-bottom: 20px;
    }
    .st-form-input label {
      display: block;
      font-size: 0.85rem;
      margin-bottom: 6px;
      color: inherit;
    }
    .st-form-input input,
    .st-form-input textarea,
    .st-form-input select {
      display: block;
      width: 100%;
      padding: 10px 12px;
      font-size: 0.9rem;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 6px;
      background: rgba(255,255,255,0.08);
      color: inherit;
      outline: none;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }
    .st-form-input input:focus,
    .st-form-input textarea:focus,
    .st-form-input select:focus {
      border-color: #3687ff;
    }
    .st-form-input input::placeholder,
    .st-form-input textarea::placeholder {
      color: rgba(255,255,255,0.3);
    }

    /* checkbox layout */
    .st-form-input--checkbox {
      display: flex; align-items: center; gap: 8px;
    }
    .st-form-input--checkbox input {
      width: auto; display: inline-block;
    }
    .st-form-input--checkbox label {
      margin-bottom: 0;
    }

    /* required indicator */
    .st-form-input--required label::after {
      content: ' *'; color: #FF5A37;
    }

    /* StringForm state classes */
    .st-form-input.-error label { color: #FF5A37; }
    .st-form-input.-error input,
    .st-form-input.-error textarea,
    .st-form-input.-error select {
      border-color: #FF5A37;
    }
    .st-form-input.-valid input,
    .st-form-input.-valid textarea,
    .st-form-input.-valid select {
      border-color: #4ade80;
    }

    .st-form-input .st-form-error {
      font-size: 0.7rem;
      margin-top: 4px;
      min-height: 1.2em;
    }
    .st-form-input.-error .st-form-error span,
    .st-form-input.-invalid .st-form-error span {
      display: block;
      color: #FF5A37;
    }
    .st-form-input.-error .st-form-error span::before {
      content: '• ';
    }
  `;
  document.head.appendChild(style);
}

/**
 * FormInput — 검증 스타일이 내장된 폼 필드 Recipe 컴포넌트
 *
 * FormField Wrapper를 내부적으로 사용하며,
 * label + input + 에러 메시지 구조와 유효성 검증 스타일을 내장한다.
 * StringForm 모듈이 `-error`, `-valid`, `-invalid` 클래스를 자동 토글한다.
 *
 * @param {Object} props
 * @param {string} props.name - 필드 이름 (식별자)
 * @param {string} [props.label] - 라벨 텍스트
 * @param {'text'|'email'|'password'|'textarea'|'checkbox'|'select'} [props.type='text'] - 입력 타입
 * @param {string} [props.placeholder=''] - placeholder 텍스트
 * @param {string} [props.validation=''] - StringForm 유효성 규칙 (예: 'required|email', 'required|min(8)')
 * @param {Array<{value: string, label: string}>} [props.options] - select 타입일 때 옵션 배열
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 */
export function FormInput({
  name,
  label,
  type = 'text',
  placeholder = '',
  validation = '',
  options = [],
  className = '',
  style,
}) {
  injectStyles();

  const isCheckbox = type === 'checkbox';
  const isTextarea = type === 'textarea';
  const isSelect = type === 'select';
  const isRequired = validation.includes('required') || validation.includes('checked');

  const wrapperClass = [
    'st-form-input',
    isCheckbox && 'st-form-input--checkbox',
    isRequired && 'st-form-input--required',
    className,
  ].filter(Boolean).join(' ');

  const inputProps = {
    name,
    id: name,
    'string-id': name,
    ...(validation && { 'string-input': validation }),
    ...(placeholder && { placeholder }),
  };

  return (
    <FormField
      as="fieldset"
      className={wrapperClass}
      style={{ border: 'none', padding: 0, margin: 0, ...style }}
      {...{ 'string-input': `group[${name}]` }}
    >
      {isCheckbox ? (
        <>
          <input type="checkbox" {...inputProps} />
          {label && <label htmlFor={name}>{label}</label>}
        </>
      ) : (
        <>
          {label && <label htmlFor={name}>{label}</label>}
          {isTextarea ? (
            <textarea rows={4} {...inputProps} />
          ) : isSelect ? (
            <select {...inputProps}>
              <option value="">{placeholder || 'Select...'}</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input type={type} {...inputProps} />
          )}
        </>
      )}
      <div className="st-form-error" {...{ 'string-input': `error[${name}]` }} />
    </FormField>
  );
}
