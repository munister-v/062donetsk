const HERITAGE_SECTION_NAMES = {
  heritage: 'Спадщина',
  campus: 'Кампус',
  building: 'Корпус',
  labs: 'Лабораторії',
  simulation: 'Симуляція',
  achievements: 'Досягнення',
  archive: 'Архів',
  certs: 'Сертифікати',
  cert: 'Сертифікат',
  future: 'Майбутнє',
  library: 'Бібліотека',
  applicant: 'Абітурієнту',
  studentlife: 'Студентське життя',
  map: 'Мапа',
  timecapsule: 'Часова капсула',
  eras: 'Порівняння епох',
  science: 'Наука',
  international: 'Міжнародне',
  departments: 'Кафедри',
  admin: 'Редактор',
};

const ComingSoonPage = ({ requestedPage, onNavigate }) => {
  const title = HERITAGE_SECTION_NAMES[requestedPage] || 'Новий розділ';

  return (
    <section className="heritage-soon page page-anim">
      <img
        className="heritage-soon-bg"
        src="assets/donetsk-library.jpg"
        alt="Науково-технічна бібліотека ДонНТУ у Донецьку"
      />
      <div className="heritage-soon-shade"></div>

      <div className="heritage-soon-content">
        <div className="heritage-soon-index">03—22</div>
        <span className="heritage-soon-kicker">DONNTU · ЦИФРОВА СПАДЩИНА</span>
        <h1>{title}</h1>
        <p className="heritage-soon-lead">
          Цей розділ проходить редакційну збірку: ми перевіряємо дати,
          підписи, походження фотографій і свідчення. Він відкриється,
          коли архів буде достатньо точним.
        </p>

        <div className="heritage-soon-status" aria-label="Статус розробки">
          <span>ЗБІР МАТЕРІАЛІВ</span>
          <span className="heritage-soon-line"><i></i></span>
          <strong>У РОЗРОБЦІ</strong>
        </div>

        <div className="heritage-soon-actions">
          <button type="button" onClick={() => onNavigate('overview')}>
            Повернутися до огляду
          </button>
          <button type="button" className="is-primary" onClick={() => onNavigate('panneau')}>
            Відкрити панно
          </button>
        </div>
      </div>

      <div className="heritage-soon-available">
        <span>Доступно зараз</span>
        <button type="button" onClick={() => onNavigate('overview')}>01 · Огляд</button>
        <button type="button" onClick={() => onNavigate('panneau')}>02 · Панно</button>
      </div>
    </section>
  );
};

Object.assign(window, { ComingSoonPage, HERITAGE_SECTION_NAMES });
