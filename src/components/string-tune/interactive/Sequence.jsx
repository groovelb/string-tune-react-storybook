import React, { forwardRef } from 'react';

/**
 * Sequence - 순차적 애니메이션 시퀀스 요소
 * @param {Object} props
 * @param {React.ElementType} [props.as='div']
 * @param {string} props.name - 시퀀스 그룹 이름
 * @param {number} [props.index] - 시퀀스 내 인덱스
 * @param {number|'prev'|'next'|'prev|loop'|'next|loop'} [props.trigger] - 트리거 모드
 * @param {React.ReactNode} [props.children]
 */
export const Sequence = forwardRef(function Sequence(
  { as, name, index, trigger, children, ...props },
  ref
) {
  const Component = as || 'div';

  // 트리거 값 생성
  const triggerValue = trigger !== undefined
    ? typeof trigger === 'number'
      ? `${name}[${trigger}]`
      : `${name}[${trigger}]`
    : undefined;

  // 시퀀스 아이템 값 생성
  const sequenceValue = index !== undefined ? `${name}[${index}]` : undefined;

  return (
    <Component
      ref={ref}
      data-string="sequence"
      {...(sequenceValue && { 'data-string-sequence': sequenceValue })}
      {...(triggerValue && { 'data-string-sequence-trigger': triggerValue })}
      {...props}
    >
      {children}
    </Component>
  );
});

/**
 * SequenceContainer - 시퀀스 그룹의 설정을 정의하는 컨테이너
 * @param {Object} props
 * @param {React.ElementType} [props.as='div']
 * @param {string} props.name - 시퀀스 그룹 이름
 * @param {number} [props.activeStep=0] - 초기 활성 인덱스
 * @param {number} [props.enteringDuration] - 진입 애니메이션 지속 시간 (ms)
 * @param {number} [props.leavingDuration] - 이탈 애니메이션 지속 시간 (ms)
 * @param {React.ReactNode} [props.children]
 */
export const SequenceContainer = forwardRef(function SequenceContainer(
  { as, name, activeStep = 0, enteringDuration, leavingDuration, children, ...props },
  ref
) {
  const Component = as || 'div';

  return (
    <Component
      ref={ref}
      data-string="sequence"
      data-string-active-step={`${name}[${activeStep}]`}
      {...(enteringDuration !== undefined && {
        'data-string-entering-duration': `${name}[${enteringDuration}]`,
      })}
      {...(leavingDuration !== undefined && {
        'data-string-leaving-duration': `${name}[${leavingDuration}]`,
      })}
      {...props}
    >
      {children}
    </Component>
  );
});
