import JinniProvider, { createDesignSystem } from '@/components/JinniProvider';
import Alert from '@/components/Alert';

const designSystem = createDesignSystem();

const WarningAlert = () => {
  return (
    <JinniProvider designSystem={designSystem}>
      <Alert status="warning" title="Experimental">
        현재 JinniUI의 모든 컴포넌트는 실험(experimental) 단계입니다. <br />
        차후 API, 스타일, Design System 등 많은 부분이 변경될 수 있으니,
        프로덕션 환경에서의 사용 시 이 점을 유의해 주세요.
      </Alert>
    </JinniProvider>
  );
};

export default WarningAlert;
